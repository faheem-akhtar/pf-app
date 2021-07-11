/*
 * Compare an input value to a comparator
 * - Will return false for inputs like: null, undefined, NaN
 * - Will return true for inputs like like: 0, '', false
 */
export function comparatorNonValue<T>(input: T): boolean {
  if (input === null || typeof input === 'undefined' || (typeof input === 'number' && isNaN(input))) {
    return false;
  }

  return true;
}
