import { multiLocationSelectorMakeHistoryKey } from './make-history-key';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';
import { WindowLocalStorageInterface } from 'context/window/local-storage/interface';

export const multiLocationSelectorGetHistory = (
  localStorage: WindowLocalStorageInterface,
  locale: LanguageCodeEnum
): LocationCompactInterface[] => {
  const historyKey = multiLocationSelectorMakeHistoryKey(locale);

  return (localStorage.getItem(historyKey) || []) as LocationCompactInterface[];
};
