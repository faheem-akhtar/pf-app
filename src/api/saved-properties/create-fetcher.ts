import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { SavedPropertyInterface } from 'components/saved-property/interface';
import { LocaleService } from 'services/locale/service';

import { ApiSavedPropertiesRequestInterface } from './request.interface';
import { ApiSavedPropertiesResponseInterface } from './response.interface';

const fetcher = ApiAuthRequiredFactory<
  null,
  ApiSavedPropertiesResponseInterface,
  ApiJsonModelInterface<ApiSavedPropertiesRequestInterface>
>({
  method: 'POST',
  url: 'saved-property',
  handledByPfWebApp: true,
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiSavedPropertiesCreateFetcher = async ({
  propertyId,
  saveDate,
}: SavedPropertyInterface): Promise<ApiFetcherResultType<null>> => {
  const locale = LocaleService.getLocale();

  const requestParams: ApiSavedPropertiesRequestInterface = {
    property_id: propertyId,
    save_date: saveDate,
  };

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
