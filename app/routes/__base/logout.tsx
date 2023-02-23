import { json } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type { CatchBoundaryComponent } from '@remix-run/react';

import { destroyUserSession } from '~/data/auth.server';
import { CatchBoundaryCmp } from '~/widgets';

export const loader: LoaderFunction = () => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw json({ message: 'notFound' }, { status: 404 });
};

export default function Logout() {
  return null;
}

export const action: ActionFunction = ({ request }) => {
  if (request.method !== 'POST') {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
};

export const CatchBoundary: CatchBoundaryComponent = () => (
  <CatchBoundaryCmp message="somethingWentWrong" />
);
