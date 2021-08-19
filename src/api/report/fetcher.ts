import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { LocaleService } from 'services/locale/service';
import { ReportAttributesInterface } from 'types/report/attributes-interface';

const fetcher = ApiFactory<BackendJsonApiModelType, ApiJsonModelInterface<ReportAttributesInterface>>({
  method: 'POST',
  url: 'property/report',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiReportFetcher = (propertyId: string, attributes: ReportAttributesInterface): void => {
  const locale = LocaleService.getLocale();
  fetcher({
    locale,
    postData: {
      propertyId,
      attributes,
    },
  }).then((response) => {
    if (!response.ok) {
      // TODO-FE[CX-180] implement Datadog logging
      // const errorMessage = `Call Lead Pop-up - ${isCountryAE ? 'Report ae' : 'International Report'} property failed`;
    }
  });
};
