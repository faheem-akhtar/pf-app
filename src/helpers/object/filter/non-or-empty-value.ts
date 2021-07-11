import { comparatorNonValue } from '../../comparator/non-value';
import { objectFilter } from '../filter';

/**
 * Remove non values from an object:
 * - Will remove falsy values like: null, undefined, NaN, ''
 * - Won't remove falsy values like: 0, false
 */
export function objectFilterNonOrEmptyValue<T extends object>(obj: T): T {
  return objectFilter(obj, (key, value) => {
    return typeof value === 'string' ? value !== '' : comparatorNonValue(value);
  });
}
