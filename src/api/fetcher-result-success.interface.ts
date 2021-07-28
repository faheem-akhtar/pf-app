import { ApiFetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface ApiFetcherResultSuccessInterface<D> extends ApiFetcherResultBaseInterface {
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
