import { memo } from 'react';

import { Form } from '@remix-run/react';

import { Button } from '~/components';

export const LogoutForm = memo(() => (
  <Form action="/logout" method="post">
    <Button text="logout" variant="error" />
  </Form>
));

LogoutForm.displayName = 'LogoutForm';
