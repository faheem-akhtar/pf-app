/**
 * Compare an input value to a comparator
 * - Will return false for inputs like: null, undefined, NaN
 * - Will return true for inputs like like: 0, '', false
 *
 * @param input The type of value
 */
export function comparatorNonValue<T>(
  input: T,
  additionalFalsyValues: Array<string | boolean | number | T> = []
): boolean {
  if (
    input === null ||
    typeof input === 'undefined' ||
    (typeof input === 'number' && isNaN(input)) ||
    additionalFalsyValues.includes(input as T)
  ) {
    return false;
  }

  return true;
}
