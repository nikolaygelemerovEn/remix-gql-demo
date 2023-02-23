import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { getInitialNamespaces } from 'remix-i18next';

import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { RemixBrowser } from '@remix-run/react';

import { schema } from '~/schema/schema';

import i18n from './i18n';

// your i18n configuration file

function hydrate() {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    link: new SchemaLink({ schema })
  });

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ApolloProvider client={apolloClient}>
          <I18nextProvider i18n={i18next}>
            <RemixBrowser />
          </I18nextProvider>
        </ApolloProvider>
      </StrictMode>
    );
  });
}

i18next
  .use(initReactI18next) // Tell i18next to use the react-i18next plugin
  .use(LanguageDetector) // Setup a client-side language detector
  .use(Backend) // Setup your backend
  .init({
    ...i18n,

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      requestOptions: {
        cache: 'no-store'
      }
    },

    detection: {
      // Because we only use htmlTag, there's no reason to cache the language
      // on the browser, so we disable it
      caches: [],

      // Here only enable htmlTag detection, we'll detect the language only
      // server-side with remix-i18next, by using the `<html lang>` attribute
      // we can communicate to the client the language detected server-side
      order: ['htmlTag']
    },
    // spread the configuration
    // This function detects the namespaces your routes rendered while SSR use
    ns: getInitialNamespaces()
  })
  .then(() => {
    // After i18next has been initialized, we can hydrate the app
    // We need to wait to ensure translations are loaded before the hydration
    // Here wrap RemixBrowser in I18nextProvider from react-i18next
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(hydrate);
    } else {
      // Safari doesn't support requestIdleCallback
      // https://caniuse.com/requestidlecallback
      setTimeout(hydrate, 1);
    }
  });
