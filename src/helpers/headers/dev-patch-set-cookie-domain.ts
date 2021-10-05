import { helpersIsDevelopment } from 'helpers/is-development';

export const headersDevPatchSetCookieDomain = (setCookieValue: string): string => {
  if (helpersIsDevelopment) {
    return setCookieValue.replace(/domain=\.propertyfinder\.ae;/g, '');
  }
  return setCookieValue;
};
