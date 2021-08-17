// eslint-disable-next-line pf-rules/forbid-import
import { useTranslation } from 'next-i18next';

const { NEXT_PUBLIC_COUNTRY_CODE } = process.env;

/**
 * It tries to read the translation for the given key in country-specific file,
 * if it's exist it will be returned, otherwise it will be read from common
 * @returns a function to reach the translations
 */
// TODO-FE[TPNX-3016] Add tests
// TODO-FE[TPNX-3145] update README
export const useTranslationHook = (namespace: string = 'common'): { t: (key: string) => string } => {
  const countrySpecifcTranslations = useTranslation(NEXT_PUBLIC_COUNTRY_CODE);
  const commonTranslations = useTranslation(namespace);

  return {
    t: (key: string): string => {
      if (
        key === countrySpecifcTranslations.t(key) &&
        key === commonTranslations.t(key) &&
        !commonTranslations.i18n.exists(key)
      ) {
        // eslint-disable-next-line no-console
        console.warn(`Translation for key "${key}" not found.`);
      }

      if (key !== countrySpecifcTranslations.t(key)) {
        return countrySpecifcTranslations.t(key);
      }

      return commonTranslations.t(key);
    },
  };
};
