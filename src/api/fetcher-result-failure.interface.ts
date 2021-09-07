import { ApiFetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface ApiFetcherResultFailureInterface extends ApiFetcherResultBaseInterface {
  ok: false;
  error: {
    payload?: unknown;
    url: string;
    status: number;
    body: string;
  };
}
