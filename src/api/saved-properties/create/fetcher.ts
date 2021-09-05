import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { ApiSavedPropertiesCreateRequestInterface } from './request.interface';
import { ApiSavedPropertiesCreateResponseInterface } from './response.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiAuthRequiredFactory<
  null,
  ApiSavedPropertiesCreateResponseInterface,
  ApiJsonModelInterface<ApiSavedPropertiesCreateRequestInterface>
>({
  method: 'POST',
  url: 'user/saved-property',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiSavedPropertiesCreateFetcher = async (
  requestParams: ApiSavedPropertiesCreateRequestInterface
): Promise<ApiFetcherResultType<null>> => {
  const locale = LocaleService.getLocale();

  return fetcher({
    locale,
    postData: {
      data: {
        type: 'saved_property',
        attributes: requestParams,
      },
    },
  });
};
