import { useTranslation } from 'react-i18next';

import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react';

import i18next from '~/i18next.server';

import mainStyles from '~/styles/main.css';

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await i18next.getLocale(request);

  return json({ locale });
};

export const handle = {
  i18n: 'common'
};

export default function Root() {
  const { locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ href: mainStyles, rel: 'stylesheet' }];
}
