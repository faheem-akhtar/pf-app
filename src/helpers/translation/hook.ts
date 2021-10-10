// eslint-disable-next-line pf-rules/forbid-import
import { useTranslation as i18nUseTranslation } from 'next-i18next';

import { helpersIsTest } from 'helpers/is-test';
import { TFunctionType } from 'types/t-function/type';

const { NEXT_PUBLIC_COUNTRY_CODE } = process.env;

/**
 * It tries to read the translation for the given key in country-specific file,
 * if it's exist it will be returned, otherwise it will be read from common
 * @returns a function to reach the translations
 */
// TODO-FE[TPNX-3016] Add tests
// TODO-FE[TPNX-3145] update README
export const useTranslation = (namespace: string = 'common'): { t: TFunctionType } => {
  const countrySpecifcTranslations = i18nUseTranslation(NEXT_PUBLIC_COUNTRY_CODE);
  const commonTranslations = i18nUseTranslation(namespace);

  return {
    t: (key, options, allowManyContext): string => {
      if (typeof options !== 'string' && options?.count === 0) {
        key = `${key}_0`;
      }

      if (allowManyContext && typeof options !== 'string' && typeof options !== 'undefined') {
        options.context = 'many';
      }

      if (
        key === countrySpecifcTranslations.t(key) &&
        key === commonTranslations.t(key) &&
        !commonTranslations.i18n.exists(key) &&
        !helpersIsTest
      ) {
        // eslint-disable-next-line no-console
        console.warn(`Translation for key "${key}" not found.`);
      }

      if (key !== countrySpecifcTranslations.t(key)) {
        return countrySpecifcTranslations.t(key, options);
      }

      return commonTranslations.t(key, options);
    },
  };
};
