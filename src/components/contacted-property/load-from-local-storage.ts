import { ApiContactedPropertiesCreateRequestInterface } from 'api/contacted-properties/create/request.interface';
import { WindowService } from 'services/window/service';

import { ContactedPropertyInterface } from './interface';
import { contactedPropertyStorageKey } from './storage-key';

export const contactedPropertyLoadFromLocalStorage = (): ContactedPropertyInterface[] => {
  const { localStorage } = WindowService;
  const contactedProperties = (localStorage.getItem(contactedPropertyStorageKey) ||
    []) as ApiContactedPropertiesCreateRequestInterface[];

  return contactedProperties.map(
    ({ property_id, contact_date, contact_type }) =>
      ({
        propertyId: property_id,
        contactDate: contact_date,
        contactType: contact_type,
      } as ContactedPropertyInterface)
  );
};
