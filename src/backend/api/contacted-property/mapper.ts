import { BackendModelContactedPropertyInterface } from 'backend/model/contacted-property/interface';
import { ContactedPropertyInterface } from 'components/contacted-property/interface';

export const backendApiContactedPropertyMapper = (
  data: BackendModelContactedPropertyInterface | BackendModelContactedPropertyInterface[]
): ContactedPropertyInterface[] => {
  const contactedProperties = Array.isArray(data) ? data : data ? [data] : [];
  return contactedProperties.map(({ id, property_id, contact_type, contact_date }) => ({
    id,
    propertyId: property_id,
    contactType: contact_type,
    contactDate: contact_date,
  }));
};
