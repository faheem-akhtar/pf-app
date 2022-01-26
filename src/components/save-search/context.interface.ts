import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiSaveSearchCreateRequestInterface } from 'api/save-search/create/request.interface';

import { SaveSearchInterface } from './interface';

export interface SaveSearchContextInterface {
  /**
   * Api response status
   */
  ok: boolean | null;

  /**
   * list of saved searches
   */
  data: SaveSearchInterface[];

  /**
   * List of filtered saved search
   */
  filtered: SaveSearchInterface[];

  /**
   * Create new saved search
   */
  create: (
    request: Pick<ApiSaveSearchCreateRequestInterface, 'name' | 'frequency'>
  ) => Promise<ApiFetcherResultType<SaveSearchInterface>>;
}
