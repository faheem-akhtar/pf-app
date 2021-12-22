import { propertySerpNextPageUrl } from '../next-page-url';

describe('propertySerpNextPageUrl()', () => {
  it('should return the next page url', () => {
    expect(propertySerpNextPageUrl('/an/example/page?page=2', 5)).toEqual('/an/example/page?page=3');
    expect(propertySerpNextPageUrl('/an/example/my-page?a=1&page=4', 5)).toEqual('/an/example/my-page?a=1&page=5');
    expect(propertySerpNextPageUrl('/an/example/page', 5)).toEqual('/an/example/page?page=2');
    expect(propertySerpNextPageUrl('/an/example/my-page?a=1', 5)).toEqual('/an/example/my-page?a=1&page=2');
  });

  it('should return undefined if there is no next page', () => {
    expect(propertySerpNextPageUrl('/an/example/page?page=2', 2)).toBeUndefined();
    expect(propertySerpNextPageUrl('/an/example/my-page?a=1&page=4', 4)).toBeUndefined();
    expect(propertySerpNextPageUrl('/an/example/page', 1)).toBeUndefined();
    expect(propertySerpNextPageUrl('/an/example/my-page?a=1', 1)).toBeUndefined();
  });
});
