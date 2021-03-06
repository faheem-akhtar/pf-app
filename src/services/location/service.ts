import { ApiFactory } from 'api/factory';

import { LocationServiceInterface } from './service.interface';
import { LocationStore } from './store';

let locationsStore: LocationStore;

const makeEtagLocalStorageKey = (locale: string): string => `locations-etag-${locale}`;

export const LocationService: LocationServiceInterface = {
  init: (locale) => {
    if (!locationsStore) {
      const etag = localStorage.getItem(makeEtagLocalStorageKey(locale));
      const updateEtag = (etag: string): void => localStorage.setItem(makeEtagLocalStorageKey(locale), etag);

      locationsStore = new LocationStore(etag, updateEtag, locale, ApiFactory);
    }
  },
  search: (searchString, limit = 10) => {
    if (!locationsStore) {
      // eslint-disable-next-line no-console
      console.error('locationsStore was not initialized.');
      return Promise.resolve([]);
    }
    return locationsStore.search(searchString, limit);
  },
  find: (predicate) => {
    if (!locationsStore) {
      // eslint-disable-next-line no-console
      console.error('locationsStore was not initialized.');
      return null;
    }

    return locationsStore.find(predicate);
  },
};
