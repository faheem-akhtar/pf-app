import { apiSavedPropertiesCreateFetcher } from 'api/saved-properties/create/fetcher';
import { arrayAreEqual } from 'helpers/array/are-equal';
import { arrayRemoveDuplicates } from 'helpers/array/remove-duplicates';
import { dateToIso } from 'helpers/date/to-iso';

import { savedPropertiesFromCached } from './from-cached';
import { savedPropertiesPersist } from './persist';

export const savedPropertiesMergeAndPersist = (savedProperties: number[]): number[] => {
  const savedPropertiesFromCache = savedPropertiesFromCached();
  const properties = arrayRemoveDuplicates(savedProperties.concat(savedPropertiesFromCache));
  const cachedOnlyProperties = savedPropertiesFromCache.filter((id) => !savedProperties.includes(id));

  if (!arrayAreEqual(savedProperties, savedPropertiesFromCache)) {
    // update the cache
    properties.map((propertyId) =>
      savedPropertiesPersist({ property_id: propertyId, save_date: dateToIso(new Date()) })
    );

    // update the db
    cachedOnlyProperties.map((propertyId) =>
      apiSavedPropertiesCreateFetcher({
        property_id: propertyId,
        save_date: dateToIso(new Date()),
      })
    );
  }

  return properties;
};
