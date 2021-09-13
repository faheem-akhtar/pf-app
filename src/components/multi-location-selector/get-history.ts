import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { multiLocationSelectorMakeHistoryKey } from './make-history-key';

export const multiLocationSelectorGetHistory = (
  localStorage: WindowLocalStorageInterface,
  locale: LanguageCodeEnum
): LocationCompactInterface[] => {
  const historyKey = multiLocationSelectorMakeHistoryKey(locale);

  return (localStorage.getItem(historyKey) || []) as LocationCompactInterface[];
};
