import { comparatorNonValue } from '../../comparator/non-value';

/**
 * Remove non values from an array:
 * - Will remove falsy values like: null, undefined, NaN
 * - Won't remove falsy values like: 0, '', false
 */
export function arrayFilterNonValue<T>(array: T[]): T[] {
  return array.filter(comparatorNonValue);
}
