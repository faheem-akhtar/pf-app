import { urlQuerySerialize } from 'helpers/url-query/serialize';
import { UrlQueryType } from 'types/url/query.type';

describe('urlQuerySerialize', () => {
  const query: UrlQueryType = { l: '3092', c: '2', fu: '0', rp: 'y', am: [] };

  it('the query should omit the key of an empty array', () => {
    expect(urlQuerySerialize({ ...query })).toBe('l=3092&c=2&fu=0&rp=y');
  });

  it('the given key and value should append the query', () => {
    const page: number = 2;
    expect(urlQuerySerialize({ ...query, page })).toBe('l=3092&c=2&fu=0&rp=y&page=2');
  });

  it('should encode the value as string and append the query', () => {
    const page = ['2'];
    expect(urlQuerySerialize({ ...query, page })).toBe('l=3092&c=2&fu=0&rp=y&page%5B%5D=2');
  });
});
