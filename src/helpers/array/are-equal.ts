/**
 * Check whether arrays contain the same values
 *
 * @param arr1 An array of list
 * @param arr2 An array of list
 * @param comparator - A comparator function to determine the equality and priority of two items
 */
export function arrayAreEqual<T>(
  arr1: T[],
  arr2: T[],
  comparator: (item1: T, item2: T) => -1 | 0 | 1 = (item1, item2): -1 | 0 | 1 => (item1 === item2 ? 0 : -1)
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1 = arr1.slice().sort(comparator);
  arr2 = arr2.slice().sort(comparator);

  return arr1.every((item, index) => comparator(arr2[index], item) === 0);
}
