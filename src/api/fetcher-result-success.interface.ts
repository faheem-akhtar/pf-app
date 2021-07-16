import { FetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface FetcherResultSuccessInterface<D> extends FetcherResultBaseInterface {
  /**
   * Ok
   */
  ok: true;
  /**
   * Data
   */
  data: D;
  /**
   * Headers
   */
  headers: Headers;
}
