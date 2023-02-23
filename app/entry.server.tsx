/* eslint-disable max-len */

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import isbot from 'isbot';
import path from 'node:path';
import { PassThrough } from 'stream';

import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import type { EntryContext } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';

import { schema } from '~/schema/schema';

import i18n from './i18n';
import i18next from './i18next.server';

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
  ssrMode: true
});

const createI18Instance = async (request: Request, context: EntryContext) => {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance();

  // Then we could detect locale from the request
  const lng = await i18next.getLocale(request);
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18next.getRouteNamespaces(context);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n,
      // The namespaces the routes about to render wants to use
      backend: {
        loadPath: path.resolve('./public/locales/{{lng}}/{{ns}}.json'),
        requestOptions: {
          cache: 'no-store'
        }
      },

      // spread the configuration
      lng,
      // The locale we detected above
      ns
    });

  return instance;
};

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise(async (resolve, reject) => {
    const i18Instance = await createI18Instance(request, remixContext);

    const App = (
      <ApolloProvider client={graphQLClient}>
        <I18nextProvider i18n={i18Instance}>
          <RemixServer context={remixContext} url={request.url} />
        </I18nextProvider>
      </ApolloProvider>
    );

    let didError = false;

    const { abort, pipe } = renderToPipeableStream(App, {
      onAllReady() {
        const body = new PassThrough();

        responseHeaders.set('Content-Type', 'text/html');

        resolve(
          new Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode
          })
        );

        pipe(body);
      },
      onError(error: unknown) {
        didError = true;

        console.error(error);
      },
      onShellError(error: unknown) {
        reject(error);
      }
    });

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise(async (resolve, reject) => {
    const i18Instance = await createI18Instance(request, remixContext);

    const App = (
      <>
        <ApolloProvider client={graphQLClient}>
          <I18nextProvider i18n={i18Instance}>
            <RemixServer context={remixContext} url={request.url} />
          </I18nextProvider>
        </ApolloProvider>
      </>
    );

    let didError = false;

    return getDataFromTree(App).then(() => {
      // Extract the entirety of the Apollo Client cache's current state
      const apolloInitialState = graphQLClient.extract();

      const { abort, pipe } = renderToPipeableStream(
        <>
          {App}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(apolloInitialState).replace(
                /</g,
                '\\u003c'
              )};`
            }}
          />
        </>,
        {
          onError(error: unknown) {
            didError = true;

            console.error(error);
          },
          onShellError(err: unknown) {
            reject(err);
          },
          onShellReady() {
            const body = new PassThrough();

            responseHeaders.set('Content-Type', 'text/html');

            resolve(
              new Response(body, {
                headers: responseHeaders,
                status: didError ? 500 : responseStatusCode
              })
            );

            pipe(body);
          }
        }
      );

      setTimeout(abort, ABORT_DELAY);
    });
  });
}
