import { ApiHttpMethodType } from 'api/http-method.type';
import { BackendApiFactory } from '../factory';
import { backendApiSaveSearchMapper } from './mapper';
import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const backendApiSaveSearchFetcher = (method: ApiHttpMethodType = 'GET'): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<SaveSearchLoadResultInterface[], BackendModelSaveSearchInterface[]>({
    method,
    url: 'saved-search',
    dataMapper: backendApiSaveSearchMapper,
  });
