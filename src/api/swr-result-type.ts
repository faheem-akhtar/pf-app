import { ApiFetcherResultFailureInterface } from './fetcher-result-failure.interface';
import { ApiFetcherResultSuccessInterface } from './fetcher-result-success.interface';

export type ApiSwrResultType<D> =
  | ApiFetcherResultSuccessInterface<D>
  | ApiFetcherResultFailureInterface
  | {
      /**
       * Loading state
       */
      ok: null;
    };
