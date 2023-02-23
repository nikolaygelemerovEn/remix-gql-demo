import { Outlet } from '@remix-run/react';

import { SC } from '~/styled';
import { LanguageSwitch } from '~/widgets';
import { Breadcrumbs } from '~/widgets';

export default function Index() {
  return (
    <SC.Main>
      <SC.Header>
        <Breadcrumbs />
        <LanguageSwitch />
      </SC.Header>
      <Outlet />
    </SC.Main>
  );
}
