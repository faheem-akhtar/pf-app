import { ApiHttpMethodType } from 'api/http-method.type';
import { BackendModelContactedPropertyInterface } from 'backend/model/contacted-property/interface';
import { ContactedPropertyInterface } from 'components/contacted-property/interface';

import { BackendApiFactory } from '../factory';
import { backendApiContactedPropertyMapper } from './mapper';

export const backendApiContactedPropertyFetcher = (
  method: ApiHttpMethodType = 'GET'
): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<ContactedPropertyInterface[], BackendModelContactedPropertyInterface[]>({
    method,
    url: 'user/contacted-property',
    dataMapper: backendApiContactedPropertyMapper,
  });
