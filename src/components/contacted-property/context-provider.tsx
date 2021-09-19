import { FunctionComponent } from 'react';

import { ContactedPropertyContext } from './context';
import { ContactedPropertyContextInterface } from './context.interface';
import { useContactedPropertyState } from './state.hook';

export const ContactedPropertyContextProvider: FunctionComponent = ({ children }) => {
  const [contactedProperties, setContactedProperty] = useContactedPropertyState();

  const value: ContactedPropertyContextInterface = {
    data: contactedProperties,
    add: setContactedProperty,
  };

  return <ContactedPropertyContext.Provider value={value}>{children}</ContactedPropertyContext.Provider>;
};
