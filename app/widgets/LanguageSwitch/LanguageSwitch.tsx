import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';

import * as S from './styled';

export const LanguageSwitch = memo(() => {
  const { i18n } = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const languages = useMemo(() => i18n.languages, []);

  return (
    <S.Container>
      {languages.map((lang) => (
        <S.Button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          selected={i18n.language === lang}
          type="button"
        >
          {lang}
          <FaLanguage />
        </S.Button>
      ))}
    </S.Container>
  );
});

LanguageSwitch.displayName = 'LanguageSwitch';
