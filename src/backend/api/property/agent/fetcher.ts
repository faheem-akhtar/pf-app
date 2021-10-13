import { BackendApiFactory } from 'backend/api/factory';
import { PropertyAgentResultType } from 'components/property/agent-result.type';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { backendApiPropertyAgentMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyAgentResultType, BackendApiPropertyJsonApiResultType>({
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
    query: {
      'filter[ids]': [id],
    },
  });
};
