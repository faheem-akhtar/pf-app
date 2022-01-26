import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';

import { PromiseAllSettledValueType } from './all-settled-value.type';

/**
 * It will return the promise after all the giving promises are either fulfilled or rejected.
 * Typings can be improved with TS >= 4.5
 */
export const promiseAllSettled = <T1, T2, T3, T4, T5>(
  values: PromiseAllSettledValueType<T1, T2, T3, T4, T5>
): Promise<[T1, T2, T3, T4, T5]> => {
  return Promise.allSettled(values).then((result) => {
    return result.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      } else {
        return {
          ok: false,
          error: {
            body: item.reason,
          },
        } as ApiFetcherResultFailureInterface;
      }
    });
  }) as unknown as Promise<[T1, T2, T3, T4, T5]>;
};
