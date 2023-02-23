import type { FC } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './styled';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = memo(({ dataTest, disabled, onClick, text, variant }) => {
  const { t } = useTranslation();

  return (
    <S.Button
      data-test={dataTest}
      disabled={disabled}
      onClick={onClick}
      text={text}
      variant={variant}
    >
      {t(text)}
    </S.Button>
  );
});

Button.displayName = 'Button';
