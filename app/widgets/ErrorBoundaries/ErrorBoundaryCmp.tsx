import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@remix-run/react';

import { SC } from '~/styled';

interface ErrorBoundaryCmpProps {
  error: Error;
  message: string;
}

export const ErrorBoundaryCmp = memo<ErrorBoundaryCmpProps>(({ error, message }) => {
  const { t } = useTranslation();

  return (
    <SC.Main>
      <SC.P>{t(error.message || message)}</SC.P>
      <SC.P>
        {t('backTo')} <Link to="/"> {t('safety')}</Link>
      </SC.P>
    </SC.Main>
  );
});

ErrorBoundaryCmp.displayName = 'ErrorBoundaryCmp';
