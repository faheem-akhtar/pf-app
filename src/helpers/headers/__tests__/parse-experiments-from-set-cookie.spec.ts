import { headersParseExperimentsFromSetCookie } from '../parse-experiments-from-set-cookie';

describe('headersParseExperimentsFromSetCookie', () => {
  it('should parse valid string', () => {
    const input =
      'someOtherKey=someOtherValue; website_ab_tests=test87%3DvariantA%2Ctest92%3Doriginal%2Ctest68%3DvariantA%2Ctest88%3Doriginal%2Ctest79%3Doriginal%2Ctest91%3DvariantA; expires=Thu, 02-Dec-2021 09:22:16 GMT; Max-Age=5184000; path=/; domain=.propertyfinder.ae; httponly; samesite=lax';
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

  it('should parse empty string', () => {
    const input = '';
    const result = headersParseExperimentsFromSetCookie(input);

    expect(result).toEqual({});
  });

  it('should parse invalid string', () => {
    const input =
      'website_ab_tests=test87%3DvariantA%2Ctest92%3Doriginal%2Ctest68%3DvariantA%2Ctest88%3Doriginal%2Ctest79%3Doriginal%2Ctest91%3Dvari ';
    const result = headersParseExperimentsFromSetCookie(input);

    expect(result).toEqual({});
  });
});
