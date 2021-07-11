/**
 * Remove properties from an object based on the comparator's return value
 * WARNING! MUTATES obj parameter.
 * TODO-FE[https://pfinder.atlassian.net/browse/WEB-6304] - refactor to return copy of obj
 */
export function objectFilter<T extends object>(obj: T, comparator: (key: keyof T, value: T[keyof T]) => boolean): T {
  Object.keys(obj).forEach((key) => {
    if (!comparator(key as keyof T, obj[key as keyof T])) {
      delete obj[key as keyof T];
    }
  });

  return obj;
}
