import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowStorageInterface } from 'services/window/storage/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { multiLocationSelectorMakeHistoryKey } from './make-history-key';

export const multiLocationSelectorUpdateHistory = (
  localStorage: WindowStorageInterface,
  locale: LanguageCodeEnum,
  newLocation: LocationCompactInterface,
  maxHistoryLength: number
): void => {
  const historyKey = multiLocationSelectorMakeHistoryKey(locale);
  const history = ((localStorage.getItem(historyKey) || []) as LocationCompactInterface[]).filter(
    (location) => location.id !== newLocation.id
  );

  history.unshift(newLocation);

  if (history.length > maxHistoryLength) {
    history.length = maxHistoryLength;
  }

  localStorage.setItem(historyKey, history);
};
