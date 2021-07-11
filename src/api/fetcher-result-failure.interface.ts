import { FetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface FetcherResultFailureInterface extends FetcherResultBaseInterface {
  ok: false;
  error: {
    url: string;
    status: number;
    body: string;
  };
}
