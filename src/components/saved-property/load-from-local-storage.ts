import { ApiSavedPropertiesRequestInterface } from 'api/saved-properties/request.interface';
import { savedPropertyStorageKey } from 'components/saved-property/storage-key';
import { WindowService } from 'services/window/service';

import { SavedPropertyInterface } from './interface';

export const savedPropertyLoadFromLocalStorage = (): SavedPropertyInterface[] => {
  const { localStorage } = WindowService;
  const savedSearches = (localStorage.getItem(savedPropertyStorageKey) || []) as ApiSavedPropertiesRequestInterface[];

  return savedSearches.map(
    ({ property_id, save_date }) =>
      ({
        propertyId: property_id,
        saveDate: save_date,
      } as SavedPropertyInterface)
  );
};
