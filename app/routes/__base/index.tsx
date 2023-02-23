import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

import type { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { Button, Link } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { SC } from '~/styled';

export default function Index() {
  const { t } = useTranslation();

  const authData = useLoaderData();

  return authData ? (
    <>
      <SC.P>{authData.email}</SC.P>
      <Form action="/logout" method="post">
        <Button text="logout" variant="error" />
      </Form>
    </>
  ) : (
    <Link to="/auth" variant="success">
      <span>{t('login')}</span>
      <FaArrowRight />
    </Link>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  /*
  if (!graphQLClient.link.context) {
    graphQLClient.setLink(new SchemaLink({ context: { req: request }, schema }));
  }

  const result = await graphQLClient.query({
    query: CURRENT_USER_QUERY
  });
  */

  return getUserFromSession(request);
};
