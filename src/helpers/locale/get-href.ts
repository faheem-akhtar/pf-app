import { configCommon } from 'config/common';
import { configOriginValue } from 'config/origin/value';

/**
 *  Create a URL to navigate
 *
 * @param locale string
 * @param path string
 */
export const localeGetHref = (locale: string, path: string, relative: boolean = false): string => {
  const { current, alternative } = configCommon.language;
  const currentLocaleIsDefault = locale === current;
  const relativeUrl = `/${currentLocaleIsDefault ? current : alternative}${path}`;

  // We should decode so that decoded url is used on both server and client side.
  return decodeURI(relative ? relativeUrl : `https://${configOriginValue}${relativeUrl}`);
};
