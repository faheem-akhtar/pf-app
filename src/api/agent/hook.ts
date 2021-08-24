import { ApiSwrFactory } from 'api/swr-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { PropertyAgentResultType } from 'components/property/agent-result.type';

export const useApiAgent = (propertyId: string, fetchData: boolean): ApiSwrResultType<PropertyAgentResultType> =>
  ApiSwrFactory<PropertyAgentResultType>({
    method: 'GET',
    url: 'property-search/agent',
    handledByPfWebApp: true,
  })({ query: { propertyId }, swrDoNotFetch: !fetchData });
