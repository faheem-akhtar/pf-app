import { BackendApiFactory } from 'backend/api/factory';
import { PropertyImagesResultType } from 'components/property/images-result.type';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { backendApiPropertyImagesMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyImagesResultType, BackendApiPropertyJsonApiResultType>({
  method: 'GET',
  url: 'property',
  queryDefaultParams: {
    'filter[allow_expired]': true,
    include: 'property_images',
  },
  dataMapper: backendApiPropertyImagesMapper,
});

export const backendApiPropertyImagesFetcher = (locale: string, ids: string[]): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    query: {
      'filter[allow_expired]': true,
      'filter[ids]': ids,
      'page[limit]': ids.length,
      include: 'property_images',
    },
  });
};
