import { AnyValueType } from 'types/any/value.type';

export const objectDeepMapKeys = <O extends Record<string, AnyValueType> | AnyValueType>(
  obj: O,
  fn: (key: string) => string
): O => {
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj as Record<string, AnyValueType>).reduce((acc, current) => {
      const key = fn(current);
      const val = (obj as Record<string, AnyValueType>)[current];
      acc[key] =
        val !== null && typeof val === 'object' ? objectDeepMapKeys(val as Record<string, AnyValueType>, fn) : val;
      return acc;
    }, {} as Record<string, AnyValueType>) as O;
  } else {
    return obj;
  }
};
