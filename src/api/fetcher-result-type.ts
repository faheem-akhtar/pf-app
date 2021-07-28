import { ApiFetcherResultFailureInterface } from './fetcher-result-failure.interface';
import { ApiFetcherResultSuccessInterface } from './fetcher-result-success.interface';

export type ApiFetcherResultType<D> = ApiFetcherResultSuccessInterface<D> | ApiFetcherResultFailureInterface;
