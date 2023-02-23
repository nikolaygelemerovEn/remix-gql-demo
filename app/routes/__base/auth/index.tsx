import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Link } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { LogoutForm } from '~/widgets';

const Login = memo(() => {
  const { t } = useTranslation();

  const authData = useLoaderData();

  return authData ? (
    <LogoutForm />
  ) : (
    <>
      <Link to="login" variant="success">
        <span>{t('login')}</span>
        <FaSignInAlt />
      </Link>
      <Link to="signup" variant="confirm">
        <span>{t('signup')}</span>
        <FaUserPlus />
      </Link>
    </>
  );
});

Login.displayName = 'Login';

export default Login;

export const loader: LoaderFunction = ({ request }) => {
  return getUserFromSession(request);
};
