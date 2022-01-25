import { FunctionComponent } from 'react';

import { apiContactedPropertiesCreateFetcher } from 'api/contacted-properties/create/fetcher';
import { useApiContactedProperties } from 'api/contacted-properties/hook';
import { useUserPropertyState } from 'components/user-property/state.hook';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContext } from './context';
import { ContactedPropertyContextInterface } from './context.interface';
import { ContactedPropertyInterface } from './interface';
import { CONTACTED_PROPERTY_STORAGE_KEY } from './storage-key.constant';

export const ContactedPropertyContextProvider: FunctionComponent = ({ children }) => {
  const contactedPropertiesResponse = useApiContactedProperties();
  const [contactedProperties, setContactedProperty] = useUserPropertyState<ContactedPropertyInterface>(
    CONTACTED_PROPERTY_STORAGE_KEY,
    contactedPropertiesResponse,
    ({ propertyId, contactType, contactDate }) =>
      ({ propertyId, contactType, contactDate } as ContactedPropertyInterface),
    apiContactedPropertiesCreateFetcher
  );

  const value: ContactedPropertyContextInterface = {
    data: contactedProperties,
    add: (propertyId, contactType) => {
      const property = {
        propertyId,
        contactType,
        contactDate: dateToIso(new Date()),
      } as ContactedPropertyInterface;

      setContactedProperty(property);
    },
  };

  return <ContactedPropertyContext.Provider value={value}>{children}</ContactedPropertyContext.Provider>;
};
