import { FunctionComponent } from 'react';

import { useSavedPropertyState } from 'components/saved-property/state.hook';

import { SavedPropertyContext } from './context';
import { SavedPropertyContextInterface } from './context.interface';

export const SavedPropertyContextProvider: FunctionComponent = ({ children }) => {
  const [savedProperties, setSavedProperty, removeSavedProperty] = useSavedPropertyState();

  const value: SavedPropertyContextInterface = {
    data: savedProperties,
    toggle: (propertyId) => {
      const propId = parseInt(propertyId, 10);
      const isSaved = !!savedProperties.find((property) => property.propertyId === propId);
      if (isSaved) {
        removeSavedProperty(propId);
      } else {
        setSavedProperty(propId);
      }
    },
  };

  return <SavedPropertyContext.Provider value={value}>{children}</SavedPropertyContext.Provider>;
};
