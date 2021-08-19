import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { ReportAttributesInterface } from 'types/report/attributes-interface';

type getFetcherReturnType = ReturnType<typeof BackendApiFactory>;

const getFetcher = (url: string): getFetcherReturnType =>
  BackendApiFactory<BackendJsonApiModelType, BackendJsonApiModelType>({
    method: 'POST',
    url,
    alterHeaders: (headers) => {
      headers['content-type'] = 'application/vnd.api+json';
    },
  });

export const backendApiPropertyReportFetcher = (
  locale: string,
  propertyId: string,
  attributes: ReportAttributesInterface
): ReturnType<getFetcherReturnType> => {
  const fetcher = getFetcher(`property/${propertyId}/report`);
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'property_report',
        attributes,
      },
    },
  });
};
