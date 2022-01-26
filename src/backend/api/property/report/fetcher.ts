import { ApiPropertyReportRequestInterface } from 'api/property/report/request.interface';
import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

const fetcher = BackendApiFactory<BackendJsonApiModelType, BackendJsonApiModelType>({
  method: 'POST',
  url: '',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
    delete headers['Host'];
  },
});

export const backendApiPropertyReportFetcher = (
  locale: string,
  propertyId: string,
  attributes: ApiPropertyReportRequestInterface
): ReturnType<ReturnType<typeof BackendApiFactory>> => {
  return fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    url: `property/${propertyId}/report`,
    postData: {
      data: {
        type: 'property_report',
        attributes,
      },
    },
  });
};
