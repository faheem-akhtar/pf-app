import { ApiContactedPropertiesCreateRequestInterface } from 'api/contacted-properties/create/request.interface';
import { WindowService } from 'services/window/service';

import { ContactedPropertyInterface } from './interface';
import { contactedPropertyStorageKey } from './storage-key';

export const contactedPropertySaveToLocalStorage = (contactedProperties: ContactedPropertyInterface[]): void => {
  const { localStorage } = WindowService;

  localStorage.setItem(
    contactedPropertyStorageKey,
    contactedProperties.map(
      ({ propertyId, contactType, contactDate }) =>
        ({
          property_id: propertyId,
          contact_type: contactType,
          contact_date: contactDate,
        } as ApiContactedPropertiesCreateRequestInterface)
    )
  );
};
