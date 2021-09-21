import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { arrayAreEqual } from 'helpers/array/are-equal';
import { arrayRemoveDuplicates } from 'helpers/array/remove-duplicates';

import { UserPropertyInterface } from './interface';
import { userPropertyLoadFromLocalStorage } from './load-from-local-storage';
import { userPropertySaveToLocalStorage } from './save-to-local-storage';

export const UserPropertyMergeAndPersistFactory =
  <Model extends UserPropertyInterface>(
    storageKey: string,
    persistOnServerFetcher: (property: Model) => Promise<ApiFetcherResultType<null>>
  ) =>
  (properties: Model[]): Model[] => {
    const propertiesFromLocalStorage = userPropertyLoadFromLocalStorage(storageKey) as Model[];
    const allProperties = arrayRemoveDuplicates(
      properties.concat(propertiesFromLocalStorage),
      (item) => item.propertyId
    );

    const propertiesInLocalStorageButNotOnServer = propertiesFromLocalStorage.filter(
      ({ propertyId }) => !properties.find((property) => property.propertyId === propertyId)
    );

    if (
      !arrayAreEqual(properties, propertiesFromLocalStorage, (item1, item2) =>
        item1.propertyId === item2.propertyId ? 0 : -1
      )
    ) {
      // update the cache
      userPropertySaveToLocalStorage(storageKey, allProperties);

      // update the db
      propertiesInLocalStorageButNotOnServer.forEach(persistOnServerFetcher);
    }

    return allProperties;
  };
