import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCatch } from '@remix-run/react';

import { SC } from '~/styled';

interface CatchBoundaryCmpProps {
  message: string;
}

export const CatchBoundaryCmp = memo<CatchBoundaryCmpProps>(({ message }) => {
  const caughtResponse = useCatch();

  const { t } = useTranslation();

  return (
    <SC.Main>
      <SC.P>{caughtResponse.status}</SC.P>
      <SC.P>{t(caughtResponse.data?.message || message)}</SC.P>
    </SC.Main>
  );
});

CatchBoundaryCmp.displayName = 'CatchBoundaryCmp';
