import { comparatorNonValue } from 'helpers/comparator/non-value';

/**
 * Returns an array from any value.
 *
 * @example arrayFromValue(1) => [1]
 * @example arrayFromValue([1, 2, 3]) => [1, 2, 3]
 * @example arrayFromValue(null) => []
 */
export const arrayFromValue = <T>(value: T | T[]): T[] => {
  // If the value is an array return the array
  if (Array.isArray(value)) {
    return value;
  }

  // If the value is not an array, return an array with the value
  // If the value is null, undefined, NaN, '', return an empty array
  return comparatorNonValue(value, ['']) ? [value] : [];
};
