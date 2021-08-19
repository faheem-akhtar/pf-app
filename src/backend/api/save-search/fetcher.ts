import { backendApiSaveSearchMapper } from './mapper';

import { BackendApiFactory } from '../factory';
import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const backendApiSaveSearchFetcher = BackendApiFactory<
  SaveSearchLoadResultInterface[],
  BackendModelSaveSearchInterface[]
>({
  method: 'GET',
  url: 'saved-search',
  queryDefaultParams: {
    'page[limit]': 9999,
  },
  dataMapper: backendApiSaveSearchMapper,
});
