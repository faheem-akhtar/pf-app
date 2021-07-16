/**
 * Compare two object literals for equivalent properties and values
 * Only support root level sorting
 */
export function objectCompare<T extends object>(obj1: T, obj2: T): boolean {
  if (
    typeof obj1 === 'undefined' ||
    typeof obj2 === 'undefined' ||
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object'
  ) {
    return obj1 === obj2;
  }

  const sortedObj1 = (Object.keys(obj1 || {}) as Array<keyof T>).sort().reduce((acc, key) => {
    let value = obj1[key];
    if (Array.isArray(value)) {
      value = value.sort();
    }
    return { ...acc, [key]: value };
  }, {} as T);
  const sortedObj2 = (Object.keys(obj2 || {}) as Array<keyof T>).sort().reduce((acc, key) => {
    let value = obj2[key];
    if (Array.isArray(value)) {
      value = value.sort();
    }
    return { ...acc, [key]: value };
  }, {} as T);

  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
}
