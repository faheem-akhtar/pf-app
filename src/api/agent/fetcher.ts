import { ApiFactory } from 'api/factory';
import { PropertyAgentInterface } from 'components/property/agent-interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<PropertyAgentInterface>({
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
