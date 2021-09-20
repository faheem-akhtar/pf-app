import { ApiHttpMethodType } from 'api/http-method.type';
import { BackendModelSavedPropertyInterface } from 'backend/model/saved-property/interface';
import { SavedPropertyInterface } from 'components/saved-property/interface';

import { BackendApiFactory } from '../factory';
import { backendApiSavedPropertyMapper } from './mapper';

export const backendApiSavedPropertyFetcher = (
  method: ApiHttpMethodType = 'GET'
): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<SavedPropertyInterface[], BackendModelSavedPropertyInterface[]>({
    method,
    url: 'user/saved-property',
    dataMapper: backendApiSavedPropertyMapper,
  });
