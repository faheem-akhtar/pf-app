import { ApiFactory } from 'api/factory';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';
import { EmailShareAttributesInterface } from 'types/email-share/attributes-interface';

type getFetcherReturnType = ReturnType<typeof ApiFactory>;

const fetcher = ApiFactory<undefined, ApiJsonModelInterface<EmailShareAttributesInterface>>({
  method: 'POST',
  url: 'property/share',
  handledByPfWebApp: true,
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  dataMapper: () => undefined,
});

export const apiShareFetcher = (
  propertyId: string,
  attributes: EmailShareAttributesInterface
): ReturnType<getFetcherReturnType> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      propertyId,
      attributes,
    },
  });
};
