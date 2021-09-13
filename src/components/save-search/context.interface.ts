import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiSaveSearchCreateRequestInterface } from 'api/save-search/create/request.interface';

import { SaveSearchLoadResultInterface } from './load-result-interface';

export interface SaveSearchContextInterface {
  /**
   * list of saved searches
   */
  data: SaveSearchLoadResultInterface[];

  /**
   * List of filtered saved search
   */
  filtered: SaveSearchLoadResultInterface[];

  /**
   * Create new saved search
   */
  create: (
    request: Pick<ApiSaveSearchCreateRequestInterface, 'name' | 'frequency'>
  ) => Promise<ApiFetcherResultType<SaveSearchLoadResultInterface>>;
}
