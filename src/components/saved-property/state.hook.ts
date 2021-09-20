import { useContext, useEffect, useState } from 'react';

import { apiSavedPropertiesCreateFetcher } from 'api/saved-properties/create-fetcher';
import { useApiSavedProperties } from 'api/saved-properties/hook';
import { apiSavedPropertiesRemoveFetcher } from 'api/saved-properties/remove-fetcher';
import { savedPropertyLoadFromLocalStorage } from 'components/saved-property/load-from-local-storage';
import { savedPropertyMergeAndPersist } from 'components/saved-property/merge-and-persist';
import { savedPropertySaveToLocalStorage } from 'components/saved-property/save-to-local-storage';
import { UserContext } from 'context/user/context';
import { dateToIso } from 'helpers/date/to-iso';

import { SavedPropertyInterface } from './interface';

export const useSavedPropertyState = (): [
  SavedPropertyInterface[],
  (propertyId: number) => void,
  (propertyId: number) => void
] => {
  const user = useContext(UserContext);
  const savedPropertiesResponse = useApiSavedProperties();
  const savePropertiesResponseData = savedPropertiesResponse.ok ? savedPropertiesResponse.data : [];
  const [savedProperties, setSavedProperties] = useState<SavedPropertyInterface[]>(savedPropertyLoadFromLocalStorage());

  useEffect(() => {
    if (user && savedPropertiesResponse.ok) {
      const data = savedPropertyMergeAndPersist(savePropertiesResponseData);
      setSavedProperties(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, savedPropertiesResponse.ok]);

  return [
    savedProperties,
    (propertyId): void => {
      const property = {
        propertyId,
        saveDate: dateToIso(new Date()),
      } as SavedPropertyInterface;

      const updatedSavedProperties = savedProperties.filter((item) => item.propertyId !== propertyId).concat(property);

      savedPropertySaveToLocalStorage(updatedSavedProperties);
      if (user) {
        apiSavedPropertiesCreateFetcher(property);
      }
      setSavedProperties(updatedSavedProperties);
    },
    (propertyId): void => {
      const updatedSavedProperties = savedProperties.filter((item) => item.propertyId !== propertyId);
      savedPropertySaveToLocalStorage(updatedSavedProperties);

      if (user) {
        apiSavedPropertiesRemoveFetcher({ propertyId: propertyId.toString() });
      }

      setSavedProperties(updatedSavedProperties);
    },
  ];
};
