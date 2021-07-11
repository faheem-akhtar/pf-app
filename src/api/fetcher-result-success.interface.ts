import { FetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface FetcherResultSuccessInterface<D> extends FetcherResultBaseInterface {
  ok: true;
  data: D;
}
