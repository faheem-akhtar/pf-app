/**
 * Finds and removes duplicate items in an array, omitting any duplicate entries after the first one
 *
 * @param array An array that will be filtered
 * @param identity A function to apply to each array item to act as its
 *                 identity key. If the item is omitted, the item's identity
 *                 will be a stringified version of itself
 */
export function arrayRemoveDuplicates<T>(
  array: Array<T>,
  identity: (item: T) => string | number = (item): string => JSON.stringify(item)
): Array<T> {
  const hashTable: Record<string, boolean> = {};

  return array.filter((item) => {
    const key = identity(item);
    if (hashTable[key]) {
      return false;
    }
    hashTable[key] = true;
    return true;
  });
}
