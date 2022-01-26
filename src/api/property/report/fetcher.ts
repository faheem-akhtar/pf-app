import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { LocaleService } from 'services/locale/service';

import { ApiPropertyReportRequestInterface } from './request.interface';

const fetcher = ApiFactory<BackendJsonApiModelType, ApiJsonModelInterface<ApiPropertyReportRequestInterface>>({
  method: 'POST',
  url: '',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiPropertyReportFetcher = (
  propertyId: string,
  attributes: ApiPropertyReportRequestInterface
): ReturnType<typeof fetcher> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    url: `property/${propertyId}/report`,
    postData: {
      data: {
        type: 'property_report',
        attributes,
      },
    },
  });
};
