import { UrlQueryType } from 'types/url/query.type';

/**
 * Serialize the query string so that it can be appended to the url
 * @example { c: '1', 'am[]': ['AB', 'CD'] } => c=1&am[]=AB&am[]=CD
 * @param query An object representing query string
 * @param encoded Whether to encode the resultant query keys and values or not
 * @returns Query as a string
 */
export const urlQuerySerialize = (query: UrlQueryType, encoded: boolean = false): string => {
  const parts: string[] = [];
  for (const key in query) {
    const value = query[key];
    const valueIsArray = Array.isArray(value);
    const values = valueIsArray ? value : [value];

    values.forEach((v) => {
      parts.push(
        encoded
          ? `${encodeURIComponent(`${key}${valueIsArray && !key.includes('[]') ? '[]' : ''}`)}=${encodeURIComponent(
              v as string
            )}`
          : `${key}=${v}`
      );
    });
  }
  return parts.join('&');
};
