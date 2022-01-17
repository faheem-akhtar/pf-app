import { ApiHttpMethodType } from 'api/http-method.type';
import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

import { BackendApiFactory } from '../factory';
import { backendApiSaveSearchMapper } from './mapper';

export const backendApiSaveSearchFetcher = (method: ApiHttpMethodType = 'GET'): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<SaveSearchLoadResultInterface[], BackendModelSaveSearchInterface[]>({
    method,
    url: method === 'GET' ? 'v2/saved-search' : 'saved-search',
    dataMapper: backendApiSaveSearchMapper,
  });
