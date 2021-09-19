import { configCommon } from 'config/common';

/**
 * @param locale The current locale value
 */
export const localeIsDefault = (locale: string): boolean => {
  return locale === configCommon.language.current;
};
