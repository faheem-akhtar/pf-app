import { ApiFactory } from 'api/factory';
import { PropertyAgentResultType } from 'components/property/agent-result.type';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<PropertyAgentResultType>({
  method: 'GET',
  url: 'property-search/agent',
  handledByPfWebApp: true,
});

export const apiAgentFetcher = (propertyId: string): ReturnType<typeof fetcher> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    query: { propertyId },
  });
};
