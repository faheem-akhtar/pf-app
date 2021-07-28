/**
 * OpaqueType type workaround
 * https://codemix.com/opaque-types-in-javascript/
 */
export type OpaqueType<K, T> = T & { __TYPE__: K };
