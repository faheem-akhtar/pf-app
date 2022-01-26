import { ApiSwrFactory } from 'api/swr-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { PropertyAgentInterface } from 'components/property/agent-interface';

export const useApiAgent = (propertyId: string, fetchData: boolean): ApiSwrResultType<PropertyAgentInterface> =>
  ApiSwrFactory<PropertyAgentInterface>({
    method: 'GET',
    url: 'property-search/agent',
    handledByPfWebApp: true,
  })({ query: { propertyId }, swrDoNotFetch: !fetchData });
