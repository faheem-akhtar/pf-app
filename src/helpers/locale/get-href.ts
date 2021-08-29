import { configCommon } from 'config/common';
import { configOriginValue } from 'config/origin/value';

/**
 *  Create a URL to navigate
 *
 * @param locale string
 * @param path string
 */
export const localeGetHref = (locale: string, path: string): string => {
  const { current, alternative } = configCommon.language;
  const currentLocaleIsDefault = locale === current;

  return `${configOriginValue}/${currentLocaleIsDefault ? current : alternative}${path}`;
};
