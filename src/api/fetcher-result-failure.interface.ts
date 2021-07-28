import { ApiFetcherResultBaseInterface } from './fetcher-result-base.interface';

export interface ApiFetcherResultFailureInterface extends ApiFetcherResultBaseInterface {
  ok: false;
  error: {
    url: string;
    status: number;
    body: string;
  };
}
