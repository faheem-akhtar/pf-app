import { BackendApiFactory } from 'backend/api/factory';
import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { PropertyAgentResultType } from 'components/property/agent-result.type';

import { backendApiPropertyAgentMapper } from './mapper';

const fetcher = BackendApiFactory<PropertyAgentResultType, BackendApiPropertyJsonApiResultType>({
  method: 'GET',
  url: 'property',
  queryDefaultParams: {
    include: 'agent,agent.languages',
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
