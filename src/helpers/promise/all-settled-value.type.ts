/**
 * Promise all settled value type
 * This will not be required when TS >= 4.5
 */
export type PromiseAllSettledValueType<T1, T2, T3, T4, T5> =
  | [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]
  | [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>];
