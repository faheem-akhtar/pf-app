import { ApiSavedPropertiesCreateRequestInterface } from 'api/saved-properties/create/request.interface';
import { WindowService } from 'services/window/service';

import { savedPropertiesStorageKey } from './storage-key';

export const savedPropertiesPersist = (request: ApiSavedPropertiesCreateRequestInterface): void => {
  const { localStorage } = WindowService;
  const savedProperties = (
    (localStorage.getItem(savedPropertiesStorageKey) || []) as ApiSavedPropertiesCreateRequestInterface[]
  ).filter((item) => item.property_id !== request.property_id);

  savedProperties.push(request);

  localStorage.setItem(savedPropertiesStorageKey, savedProperties);
};
