import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft } from 'react-icons/fa';

import { useLocation } from '@remix-run/react';

import { Link } from '~/components';

import * as S from './styled';
import { buildLinksFromLocation } from './utils';

export const Breadcrumbs = memo(() => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const links = useMemo(
    () => buildLinksFromLocation(pathname).map((link) => ({ ...link, name: t(link.name) })),
    [pathname, t]
  );

  return (
    <S.Container>
      {pathname !== '/'
        ? links.map(({ name, to }) => (
            <Link key={name} to={to} variant="link">
              <FaChevronLeft />
              {name}
            </Link>
          ))
        : null}
    </S.Container>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
