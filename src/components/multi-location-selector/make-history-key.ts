import { LanguageCodeEnum } from 'enums/language/code.enum';

export const multiLocationSelectorMakeHistoryKey = (locale: LanguageCodeEnum): string =>
  `multi-location-selector-history-${locale}`;
