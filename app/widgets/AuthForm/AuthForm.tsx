import { memo, useMemo } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTransition } from '@remix-run/react';

import { Button } from '~/components';

import * as S from './styled';
import type { AuthFormProps } from './types';

export const AuthForm: FC<AuthFormProps> = memo(({ type }) => {
  const transition = useTransition();
  const { t } = useTranslation();

  const isLogin = useMemo(() => type === 'login', [type]);

  const isSubmitting = useMemo(() => transition.state !== 'idle', [transition.state]);

  return (
    <S.Form method="post" noValidate>
      <S.Field>
        <S.Label htmlFor="email">{t('emailAddress')}</S.Label>
        <S.Input type="email" id="email" name="email" required />
      </S.Field>
      <S.Field>
        <S.Label htmlFor="password">{t('password')}</S.Label>
        <S.Input type="password" id="password" name="password" minLength={7} />
      </S.Field>
      <Button
        disabled={isSubmitting}
        text={isSubmitting ? 'submitting' : isLogin ? 'login' : 'signup'}
        variant={isLogin ? 'success' : 'confirm'}
      />
    </S.Form>
  );
});

AuthForm.displayName = 'AuthForm';
