/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from 'next-i18next';

const { NEXT_PUBLIC_COUNTRY_CODE } = process.env;

/**
 * It tries to read the translation for the given key in country-specific file,
 * if it's exist it will be returned, otherwise it will be read from common
 * @returns a function to reach the translations
 */
// TODO-FE[TPNX-3016] Add tests
// TODO-FE[TPNX-3145] update README
export const useTranslationHook = (): { t: (key: string) => string } => {
  const { t } = useTranslation(NEXT_PUBLIC_COUNTRY_CODE);
  const commonTranslations = useTranslation('common');

  return {
    t: (key: string): string => {
      if (key === t(key)) {
        return commonTranslations.t(key);
      }
      return t(key);
    },
  };
};
