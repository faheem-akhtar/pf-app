import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { LocaleService } from 'services/locale/service';
import { ReportAttributesInterface } from 'types/report/attributes-interface';

const fetcher = ApiFactory<BackendJsonApiModelType, ApiJsonModelInterface<ReportAttributesInterface>>({
  method: 'POST',
  url: 'property/report',
  handledByPfWebApp: true,
});

export const apiReportFetcher = (
  propertyId: string,
  attributes: ReportAttributesInterface
): ReturnType<typeof fetcher> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      propertyId,
      attributes,
    },
  });
};
