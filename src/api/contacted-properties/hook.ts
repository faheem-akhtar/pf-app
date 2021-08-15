import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { ContactedPropertyInterface } from 'types/contacted-property/interface';

export const useApiContactedProperties = (): ApiSwrResultType<ContactedPropertyInterface[]> =>
  ApiSwrAuthRequiredFactory<ContactedPropertyInterface[], { data: ContactedPropertyInterface[] }>({
    method: 'GET',
    url: 'user/contacted-property',
    dataMapper: ({ data }) => data,
  })({});
