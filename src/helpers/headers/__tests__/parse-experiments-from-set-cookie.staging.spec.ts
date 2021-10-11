import { headersParseExperimentsFromSetCookie } from '../parse-experiments-from-set-cookie';

describe('headersParseExperimentsFromSetCookie', () => {
  beforeAll(() => {
    process.env.ENVIRONMENT = 'staging';
  });
  afterAll(() => {
    process.env.ENVIRONMENT = 'production';
  });

  it('should parse correctly on staging environment', () => {
    const input =
      'website_ab_tests_staging=test87%3DvariantA%2Ctest92%3Doriginal%2Ctest68%3DvariantA%2Ctest88%3Doriginal%2Ctest79%3Doriginal%2Ctest91%3DvariantA; expires=Thu, 02-Dec-2021 09:22:16 GMT; Max-Age=5184000; path=/; domain=.propertyfinder.ae; httponly; samesite=lax';
    const result = headersParseExperimentsFromSetCookie(input);

    expect(result).toEqual({
      test87: {
        variants: {
          variantA: true,
        },
        async: false,
      },
      test92: {
        variants: {
          original: true,
        },
        async: false,
      },
      test68: {
        variants: {
          variantA: true,
        },
        async: false,
      },
      test88: {
        variants: {
          original: true,
        },
        async: false,
      },
      test79: {
        variants: {
          original: true,
        },
        async: false,
      },
      test91: {
        variants: {
          variantA: true,
        },
        async: false,
      },
    });
  });
});
