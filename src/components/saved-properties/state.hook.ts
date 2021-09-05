import { useContext, useEffect, useState } from 'react';

import { apiSavedPropertiesCreateFetcher } from '../../api/saved-properties/create/fetcher';
import { ApiSavedPropertiesCreateRequestInterface } from '../../api/saved-properties/create/request.interface';
import { apiSavedPropertiesRemoveFetcher } from '../../api/saved-properties/remove/fetcher';
import { dateToIso } from 'helpers/date/to-iso';
import { savedPropertiesFromCached } from 'components/saved-properties/from-cached';
import { savedPropertiesMergeAndPersist } from 'components/saved-properties/merge-and-persist';
import { savedPropertiesPersist } from 'components/saved-properties/persist';
import { savedPropertiesRemove } from 'components/saved-properties/remove';
import { useApiSavedPropertiesIds } from '../../api/saved-properties/ids.hook';
import { UserContext } from 'context/user/context';

export const useSavedPropertiesState = (
  initialState: number[] = savedPropertiesFromCached()
): [number[], (propertyId: number) => void, (propertyId: number) => void] => {
  const user = useContext(UserContext);
  const savedPropertiesResponse = useApiSavedPropertiesIds();
  const savePropertiesResponseData = savedPropertiesResponse.ok ? savedPropertiesResponse.data : [];
  const [savedProperties, setSavedProperties] = useState<number[]>(initialState);

  useEffect(() => {
    if (user && savedPropertiesResponse.ok) {
      const data = savedPropertiesMergeAndPersist(savePropertiesResponseData);
      setSavedProperties(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, savedPropertiesResponse.ok]);

  return [
    savedProperties,
    (propertyId): void => {
      const attributes: ApiSavedPropertiesCreateRequestInterface = {
        property_id: propertyId,
        save_date: dateToIso(new Date()),
      };
      savedPropertiesPersist(attributes);
      if (user) {
        apiSavedPropertiesCreateFetcher(attributes);
      }
      setSavedProperties(savedProperties.filter((id) => id !== propertyId).concat(propertyId));
    },
    (propertyId): void => {
      savedPropertiesRemove(propertyId);
      if (user) {
        apiSavedPropertiesRemoveFetcher({ propertyId: propertyId.toString() });
      }

      setSavedProperties(savedProperties.filter((id) => id !== propertyId));
    },
  ];
};
