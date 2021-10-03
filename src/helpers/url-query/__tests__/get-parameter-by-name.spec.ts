import { urlQueryGetParameterByName } from 'helpers/url-query/get-parameter-by-name';

describe('urlQueryGetParameterByName()', () => {
  const baseUrl = 'example.com';

  it('should return true', () => {
    const url = `${baseUrl}?trace-stats=true`;
    expect(urlQueryGetParameterByName('trace-stats', url)).toBeTruthy();
  });

  it('should return false', () => {
    expect(urlQueryGetParameterByName('trace-stats', baseUrl)).toBeNull();
  });

  it('should return empty string', () => {
    const url = `${baseUrl}?trace-stats`;
    expect(urlQueryGetParameterByName('trace-stats', url)).toBe('');
  });
});
