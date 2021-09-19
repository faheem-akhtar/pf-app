import { useContext, useEffect, useState } from 'react';

import { apiContactedPropertiesCreateFetcher } from 'api/contacted-properties/create/fetcher';
import { useApiContactedProperties } from 'api/contacted-properties/hook';
import { UserContext } from 'context/user/context';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContextInterface } from './context.interface';
import { ContactedPropertyInterface } from './interface';
import { contactedPropertyLoadFromLocalStorage } from './load-from-local-storage';
import { contactedPropertyMergeAndPersist } from './merge-and-persist';
import { contactedPropertySaveToLocalStorage } from './save-to-local-storage';

export const useContactedPropertyState = (): [
  ContactedPropertyInterface[],
  ContactedPropertyContextInterface['add']
] => {
  const user = useContext(UserContext);
  const contactedPropertiesResponse = useApiContactedProperties();
  const contactedPropertiesResponseData = contactedPropertiesResponse.ok ? contactedPropertiesResponse.data : [];
  const [contactedProperties, setContactedProperties] = useState(contactedPropertyLoadFromLocalStorage());

  useEffect(() => {
    if (user && contactedPropertiesResponse.ok) {
      const data = contactedPropertyMergeAndPersist(contactedPropertiesResponseData);
      setContactedProperties(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, contactedPropertiesResponse.ok]);

  return [
    contactedProperties,
    (propertyId, contactType): void => {
      const property = {
        propertyId,
        contactType,
        contactDate: dateToIso(new Date()),
      } as ContactedPropertyInterface;

      const updatedContactedProperties = contactedProperties
        .filter((item) => item.propertyId !== propertyId)
        .concat(property);

      contactedPropertySaveToLocalStorage(updatedContactedProperties);
      if (user) {
        apiContactedPropertiesCreateFetcher(property);
      }
      setContactedProperties(updatedContactedProperties);
    },
  ];
};
