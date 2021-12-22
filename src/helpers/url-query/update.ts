import { UrlQueryType } from 'types/url/query.type';

/**
 * It update the query value in the url
 * @example urlQueryUpdate('/en/search?a=2', { a: '5' }) => /en/search?a=5
 */
export const urlQueryUpdate = (url: string, query: UrlQueryType): string => {
  const [uri, params] = url.split('?');
  const searchParams = new URLSearchParams(params);

  Object.keys(query).forEach((key) => {
    searchParams.set(key, query[key] as string);
  });

  return `${uri}?${searchParams.toString()}`;
};
