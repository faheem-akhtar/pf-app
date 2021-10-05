import * as isDevelopmentModule from 'helpers/is-development';

import { headersDevPatchSetCookieDomain } from '../dev-patch-set-cookie-domain';

(isDevelopmentModule as { helpersIsDevelopment: boolean })['helpersIsDevelopment'] = true;

describe('headersDevPatchSetCookieDomain', () => {
  it('should patch if environment is dev', () => {
    const input =
      'website_ab_tests=test91%3Doriginal; expires=Thu, 02-Dec-2021 05:13:00 GMT; Max-Age=5184000; path=/; domain=.propertyfinder.ae; httponly; samesite=lax';
    expect(headersDevPatchSetCookieDomain(input)).toEqual(
      'website_ab_tests=test91%3Doriginal; expires=Thu, 02-Dec-2021 05:13:00 GMT; Max-Age=5184000; path=/;  httponly; samesite=lax'
    );
  });
});
