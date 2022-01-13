import { configCommon } from 'config/common';

import { localeIsDefault } from './is-default';

export const localeInsertDefault = (locale: string): boolean => {
  return !(localeIsDefault(locale) && !configCommon.insertDefaultLanguage);
};
