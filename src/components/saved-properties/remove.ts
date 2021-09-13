import { ApiSavedPropertiesCreateRequestInterface } from 'api/saved-properties/create/request.interface';
import { WindowService } from 'services/window/service';

import { savedPropertiesStorageKey } from './storage-key';

export const savedPropertiesRemove = (propertyId: number): void => {
  const savedSearches = (
    (WindowService.localStorage.getItem(savedPropertiesStorageKey) || []) as ApiSavedPropertiesCreateRequestInterface[]
  ).filter((item) => item.property_id !== propertyId);

  WindowService.localStorage.setItem(savedPropertiesStorageKey, savedSearches);
};
