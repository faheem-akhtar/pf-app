import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowStorageInterface } from 'services/window/storage/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { multiLocationSelectorMakeHistoryKey } from './make-history-key';

export const multiLocationSelectorGetHistory = (
  localStorage: WindowStorageInterface,
  locale: LanguageCodeEnum
): LocationCompactInterface[] => {
  const historyKey = multiLocationSelectorMakeHistoryKey(locale);

  return (localStorage.getItem(historyKey) || []) as LocationCompactInterface[];
};
