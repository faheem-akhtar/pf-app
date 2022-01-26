import { BackendApiFactory } from 'backend/api/factory';
import { PropertyAgentInterface } from 'components/property/agent-interface';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { backendApiPropertyAgentMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyAgentInterface, BackendApiPropertyJsonApiResultType>({
  method: 'GET',
  url: 'property',
  queryDefaultParams: {
    include: 'agent,agent.languages,broker',
  },
  dataMapper: backendApiPropertyAgentMapper,
});

export const backendApiPropertyAgentFetcher = (locale: string, id: string): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    query: {
      'filter[ids]': [id],
    },
  });
};
