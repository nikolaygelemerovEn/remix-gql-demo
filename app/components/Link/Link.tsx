import { memo } from 'react';

import * as S from './styled';
import type { LinkProps } from './types';

export const Link = memo<LinkProps>(({ children, to, variant }) => {
  return (
    <S.Link to={to} variant={variant}>
      {children}
    </S.Link>
  );
});

Link.displayName = 'Link';
