import { ApiSavedPropertiesCreateRequestInterface } from 'api/saved-properties/create/request.interface';
import { savedPropertiesStorageKey } from './storage-key';
import { WindowService } from 'services/window/service';

export const savedPropertiesPersist = (request: ApiSavedPropertiesCreateRequestInterface): void => {
  const { localStorage } = WindowService;
  const savedProperties = (
    (localStorage.getItem(savedPropertiesStorageKey) || []) as ApiSavedPropertiesCreateRequestInterface[]
  ).filter((item) => item.property_id !== request.property_id);

  savedProperties.push(request);

  localStorage.setItem(savedPropertiesStorageKey, savedProperties);
};
