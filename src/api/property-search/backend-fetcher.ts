import { BackendModelPropertyInterface } from 'backend/model/property/interface';
import { apiBackendFactory } from 'api/backend-factory';

export const apiPropertySearchBackendFetcher = apiBackendFactory<{ properties: BackendModelPropertyInterface[] }>({
  method: 'GET',
  url: 'search',
  queryDefaultParams: {
    include: 'properties,properties.property_type',
    'filter[category_id]': 2,
    'page[number]': 1,
    'page[limit]': 25,
    sort: 'mr',
  },
});
