import { LocaleEnum } from 'services/locale/enum';

import { DateOptionsInterface } from './options.interface';
import { DateOptionsValueEnum } from './options-value.enum';

// TODO[CX-544] - migrate unit tests

/**
 * Returns date string in locale readable format
 *
 * @example
 * If current language is Arabic
 * output: ٢٣ مايو ٢٠١٨
 *
 * If current language is French
 * output: 23 mai 2018
 *
 * If current language is English
 * output: 23 May 2018
 *
 * If current language is "arGb"
 * output: 23 مايو 2018
 */
export function dateToLocale(
  date: string,
  languageLocale: LocaleEnum,
  options: DateOptionsInterface = {
    day: DateOptionsValueEnum.numeric,
    month: DateOptionsValueEnum.short,
    year: DateOptionsValueEnum.numeric,
  }
): string {
  let locale: string;

  switch (languageLocale) {
    case LocaleEnum.ar:
      locale = 'ar-AE';
      break;
    default:
      locale = 'en-GB';
  }

  return new Date(date).toLocaleString(locale, options);
}
