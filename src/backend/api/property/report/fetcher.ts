import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { ReportAttributesInterface } from 'types/report/attributes-interface';

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
  attributes: ReportAttributesInterface
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
