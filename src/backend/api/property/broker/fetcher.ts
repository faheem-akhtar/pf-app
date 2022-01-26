import { BackendApiFactory } from 'backend/api/factory';
import { PropertyBrokerInterface } from 'components/property/broker.interface';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { backendApiPropertyBrokerMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyBrokerInterface, BackendApiPropertyJsonApiResultType>({
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
    getOrigin: configOriginIfDevUseStagingValue,
    query: {
      'filter[ids]': [id],
    },
  });
};
