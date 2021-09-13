import { FunctionComponent } from 'react';

import { useSavedPropertiesState } from 'components/saved-properties/state.hook';

import { SavePropertyContext } from './context';
import { SavePropertyContextInterface } from './context.interface';

export const SavePropertyContextProvider: FunctionComponent = ({ children }) => {
  const [savedProperties, setSavedProperty, removeSavedProperty] = useSavedPropertiesState();

  const value: SavePropertyContextInterface = {
    propertyIds: savedProperties,
    toggle: (propertyId) => {
      const propId = parseInt(propertyId, 10);
      const isSaved = savedProperties.includes(propId);
      if (isSaved) {
        removeSavedProperty(propId);
      } else {
        setSavedProperty(propId);
      }
    },
  };

  return <SavePropertyContext.Provider value={value}>{children}</SavePropertyContext.Provider>;
};
