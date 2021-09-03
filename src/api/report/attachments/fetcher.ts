import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<BackendJsonApiModelType, ApiJsonModelInterface<null>>({
  method: 'POST',
  url: 'property/report',
  formData: true,
  alterHeaders: (headers) => {
    delete headers['content-type'];
  },
});

export const apiReportAttachmentsFetcher = (propertyId: string, data: FormData): ReturnType<typeof fetcher> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    url: `property/report/${propertyId}/attachments`,
    postData: data,
  });
};
