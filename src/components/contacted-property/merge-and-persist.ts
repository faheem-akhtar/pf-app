import { apiContactedPropertiesCreateFetcher } from 'api/contacted-properties/create/fetcher';
import { arrayAreEqual } from 'helpers/array/are-equal';
import { arrayRemoveDuplicates } from 'helpers/array/remove-duplicates';

import { ContactedPropertyInterface } from './interface';
import { contactedPropertyLoadFromLocalStorage } from './load-from-local-storage';
import { contactedPropertySaveToLocalStorage } from './save-to-local-storage';

export const contactedPropertyMergeAndPersist = (
  contactedProperties: ContactedPropertyInterface[]
): ContactedPropertyInterface[] => {
  const contactedPropertiesFromCache = contactedPropertyLoadFromLocalStorage();
  const allProperties = arrayRemoveDuplicates(
    contactedProperties.concat(contactedPropertiesFromCache),
    (item) => item.propertyId
  );
  const propertyIdsInLocalStorageButNotOnServer = contactedPropertiesFromCache.filter(
    ({ propertyId }) => !contactedProperties.find((property) => property.propertyId === propertyId)
  );

  if (
    !arrayAreEqual(contactedProperties, contactedPropertiesFromCache, (item1, item2) =>
      item1.propertyId === item2.propertyId ? 0 : -1
    )
  ) {
    // update the cache
    contactedPropertySaveToLocalStorage(allProperties);

    // update the server
    propertyIdsInLocalStorageButNotOnServer.forEach(apiContactedPropertiesCreateFetcher);
  }

  return allProperties;
};
