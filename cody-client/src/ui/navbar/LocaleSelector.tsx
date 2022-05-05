import { Icon } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LocaleSelectorProps {}

export const LocaleSelector: React.FC<LocaleSelectorProps> = () => {

  const { t, i18n } = useTranslation();

  const availableLocales = ['hu', 'en'];
  type availableLocaleType = typeof availableLocales[number];

  const changeLocale = (locale: availableLocaleType) => {
    i18n.changeLanguage(locale);
    localStorage.setItem('cody-locale', locale);
  }

  return (
    <div className='locale-selector'>
      {availableLocales.map((locale: availableLocaleType) => (
        <img
          src={`${process.env.PUBLIC_URL}/flags/${locale}.svg`}
          alt={t('flag', { context: locale })}
          onClick={() => changeLocale(locale)}
          className='locale-selector-item'
        />
      ))}
    </div>
  );
};