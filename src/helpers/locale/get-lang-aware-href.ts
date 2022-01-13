import { localeGetHref } from './get-href';
import { localeInsertDefault } from './insert-default';

export const localeGetLangAwareHref = (locale: string, path: string, relative: boolean = false): string => {
  return localeGetHref(locale, path, relative, localeInsertDefault(locale));
};
