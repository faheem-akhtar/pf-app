import { FetcherResultFailureInterface } from './fetcher-result-failure.interface';
import { FetcherResultSuccessInterface } from './fetcher-result-success.interface';

export type ApiHookResultType<D> =
  | FetcherResultSuccessInterface<D>
  | FetcherResultFailureInterface
  | {
      /**
       * Loading state
       */
      ok: null;
    };
