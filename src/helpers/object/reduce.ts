/**
 * It wraps the Object reduce function
 * @param source The source object
 * @param predicate The reduce function
 * @param target The optional target object
 */
export const objectReduce = <T extends object, R>(
  source: T,
  predicate: (accumulated: R, key: keyof T, val: T[keyof T]) => R,
  target: R = {} as R
): R => {
  return (Object.keys(source) as Array<keyof T>).reduce((accumulated, current) => {
    return predicate(accumulated, current, source[current]);
  }, target);
};
