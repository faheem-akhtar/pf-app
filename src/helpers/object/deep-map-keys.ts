import { AnyValueType } from 'types/any/value.type';

export const objectDeepMapKeys = (obj: object, fn: (key: string) => string): Record<string, AnyValueType> => {
  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, current) => {
      const key = fn(current);
      const val = (obj as Record<string, AnyValueType>)[current];
      acc[key] =
        val !== null && typeof val === 'object' ? objectDeepMapKeys(val as Record<string, AnyValueType>, fn) : val;
      return acc;
    }, {} as Record<string, AnyValueType>);
  } else {
    return obj;
  }
};
