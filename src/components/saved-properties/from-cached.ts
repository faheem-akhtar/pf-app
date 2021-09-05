import { ApiSavedPropertiesCreateRequestInterface } from 'api/saved-properties/create/request.interface';
import { savedPropertiesStorageKey } from 'components/saved-properties/storage-key';
import { WindowService } from 'services/window/service';

export const savedPropertiesFromCached = (): number[] => {
  const { localStorage } = WindowService;
  const savedSearches = (localStorage.getItem(savedPropertiesStorageKey) ||
    []) as ApiSavedPropertiesCreateRequestInterface[];

  return savedSearches.map(({ property_id }) => property_id);
};
