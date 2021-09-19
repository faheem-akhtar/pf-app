import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { ContactedPropertyInterface } from 'components/contacted-property/interface';

export const useApiContactedProperties = (): ApiSwrResultType<ContactedPropertyInterface[]> =>
  ApiSwrAuthRequiredFactory<ContactedPropertyInterface[], { data: ContactedPropertyInterface[] }>({
    method: 'GET',
    url: 'contacted-property',
    handledByPfWebApp: true,
  })({});
