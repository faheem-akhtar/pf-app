import { headersDevPatchSetCookieDomain } from '../dev-patch-set-cookie-domain';

describe('headersDevPatchSetCookieDomain', () => {
  it('should not patch if environment is not dev', () => {
    const input =
      'website_ab_tests=test87%3DvariantA%2Ctest92%3Doriginal%2Ctest68%3DvariantA%2Ctest88%3DvariantA%2Ctest79%3Doriginal%2Ctest91%3Doriginal; expires=Thu, 02-Dec-2021 05:13:00 GMT; Max-Age=5184000; path=/; domain=.propertyfinder.ae; httponly; samesite=lax';
    expect(headersDevPatchSetCookieDomain(input)).toEqual(input);
  });
});
