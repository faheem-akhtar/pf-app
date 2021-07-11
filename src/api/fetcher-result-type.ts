import { FetcherResultFailureInterface } from './fetcher-result-failure.interface';
import { FetcherResultSuccessInterface } from './fetcher-result-success.interface';

export type ApiFetcherResultType<D> = FetcherResultSuccessInterface<D> | FetcherResultFailureInterface;
