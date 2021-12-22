import { propertySerpPreviousPageUrl } from '../previous-page-url';

describe('propertySerpPreviousPageUrl', () => {
  it('should return the previous page url', () => {
    expect(propertySerpPreviousPageUrl('/an/example/page?page=2')).toEqual('/an/example/page?page=1');
    expect(propertySerpPreviousPageUrl('/an/example/my-page?a=1&page=4')).toEqual('/an/example/my-page?a=1&page=3');
  });

  it('should return undefined if there is no previous page', () => {
    expect(propertySerpPreviousPageUrl('/an/example/page?page=1')).toBeUndefined();
    expect(propertySerpPreviousPageUrl('/an/example/my-page?a=1&page=1')).toBeUndefined();
    expect(propertySerpPreviousPageUrl('/an/example/page')).toBeUndefined();
    expect(propertySerpPreviousPageUrl('/an/example/my-page?a=1')).toBeUndefined();
  });
});
