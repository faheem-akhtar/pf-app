import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'components/location/compact.interface';
import { WindowLocalStorageInterface } from 'helpers/window/local-storage.interface';
import { multiLocationSelectorMakeHistoryKey } from './make-history-key';

export const multiLocationSelectorUpdateHistory = (
  localStorage: WindowLocalStorageInterface,
  locale: LanguageCodeEnum,
  newLocation: LocationCompactInterface,
  maxHistoryLength: number
): void => {
  const historyKey = multiLocationSelectorMakeHistoryKey(locale);
  const history = (localStorage.getItem<LocationCompactInterface[]>(historyKey) || []).filter(
    (location) => location.id !== newLocation.id
  );

  history.unshift(newLocation);

  if (history.length > maxHistoryLength) {
    history.length = maxHistoryLength;
  }

  localStorage.setItem(historyKey, history);
};
