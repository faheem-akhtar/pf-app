import { FunctionComponent } from 'react';

import { apiSavedPropertiesCreateFetcher } from 'api/saved-properties/create-fetcher';
import { useApiSavedProperties } from 'api/saved-properties/hook';
import { apiSavedPropertiesRemoveFetcher } from 'api/saved-properties/remove-fetcher';
import { useUserPropertyState } from 'components/user-property/state.hook';
import { dateToIso } from 'helpers/date/to-iso';

import { SavedPropertyContext } from './context';
import { SavedPropertyContextInterface } from './context.interface';
import { SavedPropertyInterface } from './interface';
import { savedPropertyStorageKey } from './storage-key';

export const SavedPropertyContextProvider: FunctionComponent = ({ children }) => {
  const savedPropertiesResponse = useApiSavedProperties();
  const [savedProperties, setSavedProperty, removeSavedProperty] = useUserPropertyState<SavedPropertyInterface>(
    savedPropertyStorageKey,
    savedPropertiesResponse,
    ({ propertyId, saveDate }) => ({ propertyId, saveDate } as SavedPropertyInterface),
    apiSavedPropertiesCreateFetcher,
    apiSavedPropertiesRemoveFetcher
  );

  const value: SavedPropertyContextInterface = {
    data: savedProperties,
    toggle: (propertyId) => {
      const property = {
        propertyId: parseInt(propertyId, 10),
        saveDate: dateToIso(new Date()),
      } as SavedPropertyInterface;
      const isSaved = !!savedProperties.find((item) => item.propertyId === property.propertyId);

      if (isSaved) {
        removeSavedProperty(property);
      } else {
        setSavedProperty(property);
      }
    },
  };

  return <SavedPropertyContext.Provider value={value}>{children}</SavedPropertyContext.Provider>;
};
