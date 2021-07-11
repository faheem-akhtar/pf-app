export type UrlQuery = Record<string, number | boolean | string | string[] | number[] | void>;

export type ValueOf<T> = T[keyof T];

/**
 * Opaque type workaround
 * https://codemix.com/opaque-types-in-javascript/
 */
export type Opaque<K, T> = T & { __TYPE__: K };
