import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { ContactedPropertyInterface } from 'components/contacted-property/interface';
import { LocaleService } from 'services/locale/service';

import { ApiContactedPropertiesCreateRequestInterface } from './request.interface';
import { ApiContactedPropertiesCreateResponseInterface } from './response.interface';

const fetcher = ApiAuthRequiredFactory<
  null,
  ApiContactedPropertiesCreateResponseInterface,
  ApiJsonModelInterface<ApiContactedPropertiesCreateRequestInterface>
>({
  method: 'POST',
  url: 'contacted-property',
  handledByPfWebApp: true,
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiContactedPropertiesCreateFetcher = async ({
  propertyId,
  contactType,
  contactDate,
}: ContactedPropertyInterface): Promise<ApiFetcherResultType<null>> => {
  const locale = LocaleService.getLocale();
  const requestParams: ApiContactedPropertiesCreateRequestInterface = {
    property_id: propertyId,
    contact_type: contactType,
    contact_date: contactDate,
  };

  return fetcher({
    locale,
    postData: {
      data: {
        type: 'contacted_property',
        attributes: requestParams,
      },
    },
  });
};
