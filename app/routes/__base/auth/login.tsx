import { memo } from 'react';
import type { ActionFunction } from 'react-router';

import type { ErrorBoundaryComponent, LoaderFunction } from '@remix-run/node';
import type { CatchBoundaryComponent } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { createUserSession, getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { LOGIN_MUTATION } from '~/mutations';
import type { UserData } from '~/types';
import { AuthForm, CatchBoundaryCmp, ErrorBoundaryCmp, LogoutForm } from '~/widgets';

const Login = memo(() => {
  const authData = useLoaderData();

  return authData ? <LogoutForm /> : <AuthForm type="login" />;
});

Login.displayName = 'Login';

export default Login;

export const loader: LoaderFunction = ({ request }) => {
  return getUserFromSession(request);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as unknown as UserData;

  const {
    data: { login: user }
  } = await graphQLClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: credentials
  });

  return createUserSession(user, '/');
};

export const CatchBoundary: CatchBoundaryComponent = () => (
  <CatchBoundaryCmp message="somethingWentWrong" />
);

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <ErrorBoundaryCmp error={error} message="couldNotLogin" />
);
