import { BackendApiFactory } from 'backend/api/factory';
import { PropertyBrokerResultType } from 'components/property/broker-result.type';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { backendApiPropertyBrokerMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyBrokerResultType, BackendApiPropertyJsonApiResultType>({
  method: 'GET',
  url: 'property',
  queryDefaultParams: {
    include: 'broker',
  },
  dataMapper: backendApiPropertyBrokerMapper,
});

export const backendApiPropertyBrokerFetcher = (locale: string, id: string): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    query: {
      'filter[ids]': [id],
    },
  });
};
