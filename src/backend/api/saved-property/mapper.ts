import { BackendModelSavedPropertyInterface } from 'backend/model/saved-property/interface';
import { SavedPropertyInterface } from 'components/saved-property/interface';

export const backendApiSavedPropertyMapper = (
  data: BackendModelSavedPropertyInterface | BackendModelSavedPropertyInterface[]
): SavedPropertyInterface[] => {
  const savedProperties = Array.isArray(data) ? data : data ? [data] : [];
  return savedProperties.map(({ id, property_id, save_date }) => ({
    id,
    propertyId: property_id,
    saveDate: save_date,
  }));
};
