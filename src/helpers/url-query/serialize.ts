import { UrlQueryType } from 'types/url/query.type';

// TODO-FE[TPNX-3005] add test
export const urlQuerySerialize = (query: UrlQueryType): string => {
  const parts: string[] = [];
  for (const key in query) {
    const value = query[key];
    const valueIsArray = Array.isArray(value);
    const values = Array.isArray(value) ? value : [value];

    values.forEach((v) => {
      parts.push(`${encodeURIComponent(`${key}${valueIsArray ? '[]' : ''}`)}=${encodeURIComponent(v as string)}`);
    });
  }
  return parts.join('&');
};
