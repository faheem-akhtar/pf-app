import { ApiSavedPropertiesRequestInterface } from 'api/saved-properties/request.interface';
import { WindowService } from 'services/window/service';

import { SavedPropertyInterface } from './interface';
import { savedPropertyStorageKey } from './storage-key';

export const savedPropertySaveToLocalStorage = (savedProperties: SavedPropertyInterface[]): void => {
  const { localStorage } = WindowService;

  localStorage.setItem(
    savedPropertyStorageKey,
    savedProperties.map(
      ({ propertyId, saveDate }) =>
        ({
          property_id: propertyId,
          save_date: saveDate,
        } as ApiSavedPropertiesRequestInterface)
    )
  );
};
