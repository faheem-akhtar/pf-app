import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

import { ApiPropertyShareRequestInterface } from './request-interface';

type getFetcherReturnType = ReturnType<typeof ApiFactory>;

const fetcher = ApiFactory<undefined, ApiJsonModelInterface<ApiPropertyShareRequestInterface>>({
  method: 'POST',
  url: '',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiPropertyShareFetcher = (
  propertyId: string,
  attributes: ApiPropertyShareRequestInterface
): ReturnType<getFetcherReturnType> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    url: `property/${propertyId}/share`,
    postData: {
      data: {
        type: 'property_share',
        attributes,
      },
    },
  });
};
