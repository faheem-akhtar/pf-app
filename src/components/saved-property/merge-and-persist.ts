import { apiSavedPropertiesCreateFetcher } from 'api/saved-properties/create-fetcher';
import { arrayAreEqual } from 'helpers/array/are-equal';
import { arrayRemoveDuplicates } from 'helpers/array/remove-duplicates';

import { SavedPropertyInterface } from './interface';
import { savedPropertyLoadFromLocalStorage } from './load-from-local-storage';
import { savedPropertySaveToLocalStorage } from './save-to-local-storage';

export const savedPropertyMergeAndPersist = (savedProperties: SavedPropertyInterface[]): SavedPropertyInterface[] => {
  const savedPropertiesFromCache = savedPropertyLoadFromLocalStorage();
  const allProperties = arrayRemoveDuplicates(
    savedProperties.concat(savedPropertiesFromCache),
    (item) => item.propertyId
  );

  const propertiesInLocalStorageButNotOnServer = savedPropertiesFromCache.filter(
    ({ propertyId }) => !savedProperties.find((property) => property.propertyId === propertyId)
  );

  if (
    !arrayAreEqual(savedProperties, savedPropertiesFromCache, (item1, item2) =>
      item1.propertyId === item2.propertyId ? 0 : -1
    )
  ) {
    // update the cache
    savedPropertySaveToLocalStorage(allProperties);

    // update the db
    propertiesInLocalStorageButNotOnServer.forEach(apiSavedPropertiesCreateFetcher);
  }

  return allProperties;
};
