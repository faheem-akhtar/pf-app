import { useContext, useEffect, useState } from 'react';

import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiSwrResultType } from 'api/swr-result-type';

import { UserContext } from '../context';
import { UserPropertyInterface } from './interface';
import { userPropertyLoadFromLocalStorage } from './load-from-local-storage';
import { UserPropertyMergeAndPersistFactory } from './merge-and-persist-factory';
import { userPropertySaveToLocalStorage } from './save-to-local-storage';

export const useUserPropertyState = <State extends UserPropertyInterface>(
  storageKey: string,
  apiResponse: ApiSwrResultType<State[]>,
  dataMapper: (item: State) => State,
  createFetcher: (property: State) => Promise<ApiFetcherResultType<null>>,
  removeFetcher?: (property: State) => Promise<ApiFetcherResultType<null>>
): [State[], (property: State) => void, (property: State) => void] => {
  const user = useContext(UserContext);
  const userPropertyMergeAndPersist = UserPropertyMergeAndPersistFactory(storageKey, createFetcher);
  const apiResponseData = apiResponse.ok ? apiResponse.data : [];

  const [properties, setProperties] = useState(userPropertyLoadFromLocalStorage(storageKey) as State[]);

  const addProperty = (property: State): void => {
    const updatedProperties = properties.filter((item) => item.propertyId !== property.propertyId).concat(property);

    userPropertySaveToLocalStorage(storageKey, updatedProperties);

    if (user) {
      createFetcher(property);
    }

    setProperties(updatedProperties);
  };

  const removeProperty = (property: State): void => {
    const updatedProperties = properties.filter((item) => item.propertyId !== property.propertyId);

    userPropertySaveToLocalStorage(storageKey, updatedProperties);

    if (user && removeFetcher) {
      removeFetcher(property);
    }

    setProperties(updatedProperties);
  };

  useEffect(() => {
    if (user && apiResponse.ok) {
      const data = userPropertyMergeAndPersist(apiResponseData.map(dataMapper));
      setProperties(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, apiResponse.ok, apiResponseData]);

  return [properties, addProperty, removeProperty];
};
