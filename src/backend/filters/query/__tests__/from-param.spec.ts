import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { FiltersQueryParamInterface } from 'components/filters/query/param.interface';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';

import { backendFiltersQueryFromParam } from '../from-param';

describe('backendFiltersQueryFromParam()', () => {
  it('should return query filters', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.category]: 'rent',
          [FiltersQueryParamEnum.bedroom]: '3-bedrooms',
          [FiltersQueryParamEnum.furnish]: 'furnished',
          [FiltersQueryParamEnum.priceType]: 'monthly',
          [FiltersQueryParamEnum.propertyType]: 'villa',
          [FiltersQueryParamEnum.city]: 'abu-dhabi',
        },
        'en',
        '/en/abc'
      ).query
    ).toEqual({
      [FiltersQueryParametersEnum.categoryId]: '2',
      [FiltersQueryParametersEnum.bedrooms]: ['3'],
      [FiltersQueryParametersEnum.furnishing]: '1',
      [FiltersQueryParametersEnum.pricePeriod]: 'm',
      [FiltersQueryParametersEnum.propertyTypeId]: '35',
      [FiltersQueryParametersEnum.locationsIds]: '6',
    });
  });

  it('should return query filters for studio', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.bedroom]: 'studio',
        },
        'en',
        '/en/abc'
      ).query
    ).toEqual({
      [FiltersQueryParametersEnum.bedrooms]: ['0'],
    });
  });

  it('should return query filters for a location', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.location]: 'jumeirah-village-circle',
        },
        'en',
        '/en/abc'
      ).query
    ).toEqual({
      [FiltersQueryParametersEnum.locationsIds]: '73',
    });
  });

  it('should also return other query params', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.location]: 'jumeirah-village-circle',
          [FiltersQueryParametersEnum.categoryId]: '1',
          test: 'testing',
          arr: ['a', 'b'],
        } as FiltersQueryParamInterface,
        'en',
        '/en/abc'
      ).query
    ).toEqual({
      [FiltersQueryParametersEnum.locationsIds]: '73',
      [FiltersQueryParametersEnum.categoryId]: '1',
      test: 'testing',
      arr: ['a', 'b'],
    });
  });

  it('should return error for invalid sale type', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.category]: 'rent',
          [FiltersQueryParamEnum.saleType]: 'for-sale',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeTruthy();

    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.category]: 'buy',
          [FiltersQueryParamEnum.saleType]: 'for-rent',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeTruthy();

    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.saleType]: 'for-rent',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeTruthy();

    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.saleType]: 'for-sale',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeTruthy();

    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.saleType]: 'for-abc',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeTruthy();
  });

  it('should accept custom property type', () => {
    expect(
      backendFiltersQueryFromParam(
        {
          [FiltersQueryParamEnum.propertyType]: 'properties',
        },
        'en',
        '/en/abc'
      ).error
    ).toBeFalsy();
  });

  describe('Invalid values', () => {
    [
      {
        [FiltersQueryParamEnum.category]: 'mortgage',
      },
      {
        [FiltersQueryParamEnum.bedroom]: '100-bedroom',
      },
      {
        [FiltersQueryParamEnum.furnish]: 'not-furnished',
      },
      {
        [FiltersQueryParamEnum.priceType]: 'hourly',
      },
      {
        [FiltersQueryParamEnum.propertyType]: 'container',
      },
      {
        [FiltersQueryParamEnum.city]: 'abbottabad',
      },
      {
        [FiltersQueryParamEnum.location]: 'market',
      },
      {
        [FiltersQueryParamEnum.saleType]: 'for-nothing',
      },
    ].map((queryParams) => {
      it(`should return error if invalid value is passed for ${Object.keys(queryParams)[0]}`, () => {
        expect(backendFiltersQueryFromParam(queryParams, 'en', '/en/abc').error).toBeTruthy();
      });
    });
  });

  describe('category', () => {
    (
      [
        [{ en: 'rent', ar: '??????????????' }, '2'],
        [{ en: 'buy', ar: '??????????' }, '1'],
        [{ en: 'commercial-rent', ar: '????????????-??????????????' }, '4'],
        [{ en: 'commercial-buy', ar: '????????????-??????????' }, '3'],
      ] as Array<[{ en: string; ar: string }, string]>
    ).forEach(([value, id]) => {
      it(`should return valid category for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.category]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.categoryId]: id,
        });
      });

      it(`should return valid category for arabic ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.category]: value.ar,
            },
            'ar',
            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.categoryId]: id,
        });
      });
    });
  });

  describe('property type', () => {
    (
      [
        [{ en: 'apartments', ar: '??????' }, '1'],
        [{ en: 'penthouses', ar: '??????????????' }, '20'],
        [{ en: 'villas', ar: '??????' }, '35'],
        [{ en: 'duplexes', ar: '????????????' }, '24'],
        [{ en: 'hotels-hotel-apartments', ar: '??????????-??????-????????????' }, '45'],
        [{ en: 'whole-buildings', ar: '??????????-??????????????' }, '10'],
        [{ en: 'bulk-sale-units', ar: '????????-??????????' }, '30'],
        [{ en: 'bulk-rent-units', ar: '????????????-??????????????' }, '34'],
        [{ en: 'full-floors', ar: '????????-????????' }, '18'],
        [{ en: 'land', ar: '??????????' }, '5'],
        [{ en: 'townhouses', ar: '????????-????????' }, '22'],
        [{ en: 'half-floors', ar: '??????-????????' }, '29'],
        [{ en: 'compounds', ar: '????????????-??????????' }, '42'],
        [{ en: 'bungalows', ar: '????????????' }, '31'],
        [{ en: 'offices', ar: '??????????' }, '4'],
        [{ en: 'retail-spaces', ar: '??????????' }, '27'],
        [{ en: 'warehouses', ar: '????????????????' }, '13'],
        [{ en: 'shops', ar: '??????????' }, '21'],
        [{ en: 'showrooms', ar: '??????????-??????' }, '12'],
        [{ en: 'factories', ar: '??????????' }, '44'],
        [{ en: 'labor-camps', ar: '??????-????????' }, '11'],
        [{ en: 'staff-accommodation', ar: '??????-????????????' }, '43'],
        [{ en: 'business-centres', ar: '??????????-??????????' }, '48'],
        [{ en: 'co-working-spaces', ar: '??????????-??????-??????????' }, '49'],
        [{ en: 'farms', ar: '??????????' }, '50'],
      ] as Array<[{ en: string; ar: string }, string]>
    ).forEach(([value, id]) => {
      it(`should return valid property type for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.propertyType]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.propertyTypeId]: id,
        });
      });

      it(`should return valid property type for arabic ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.propertyType]: value.ar,
            },
            'ar',
            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.propertyTypeId]: id,
        });
      });
    });
  });

  describe('bedrooms', () => {
    (
      [
        [{ en: 'studio', ar: '??????????????' }, '0'],
        [{ en: '1-bedroom', ar: '1-????????-??????' }, '1'],
        [{ en: '2-bedroom', ar: '2-????????-??????' }, '2'],
        [{ en: '3-bedroom', ar: '3-????????-??????' }, '3'],
        [{ en: '4-bedroom', ar: '4-????????-??????' }, '4'],
        [{ en: '5-bedroom', ar: '5-????????-??????' }, '5'],
        [{ en: '6-bedroom', ar: '6-????????-??????' }, '6'],
        [{ en: '7-bedroom', ar: '7-????????-??????' }, '7'],
      ] as Array<[{ en: string; ar: string }, string]>
    ).forEach(([value, id]) => {
      it(`should return valid bedroom for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.bedroom]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.bedrooms]: [id],
        });
      });

      it(`should return valid bedroom for arabic ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.bedroom]: value.ar,
            },
            'ar',
            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.bedrooms]: [id],
        });
      });
    });
  });

  describe('furnish', () => {
    ([[{ en: 'furnished', ar: '????????????' }, '1']] as Array<[{ en: string; ar: string }, string]>).forEach(
      ([value, id]) => {
        it(`should return valid furnish for english ${value.en}`, () => {
          expect(
            backendFiltersQueryFromParam(
              {
                [FiltersQueryParamEnum.furnish]: value.en,
              },
              'en',

              '/en/abc'
            ).query
          ).toEqual({
            [FiltersQueryParametersEnum.furnishing]: id,
          });
        });

        it(`should return valid furnish for arabic ${value.en}`, () => {
          expect(
            backendFiltersQueryFromParam(
              {
                [FiltersQueryParamEnum.furnish]: value.ar,
              },
              'ar',

              '/en/abc'
            ).query
          ).toEqual({
            [FiltersQueryParametersEnum.furnishing]: id,
          });
        });
      }
    );
  });

  describe('price type', () => {
    ([[{ en: 'monthly', ar: '????????' }, 'm']] as Array<[{ en: string; ar: string }, string]>).forEach(([value, id]) => {
      it(`should return valid price type for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.priceType]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.pricePeriod]: id,
        });
      });

      it(`should return valid price type for arabic ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.priceType]: value.ar,
            },
            'ar',
            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.pricePeriod]: id,
        });
      });
    });
  });

  describe('location / city', () => {
    (
      [
        [{ en: 'dubai', ar: '??????' }, '1'],
        [{ en: 'dubai-marina', ar: '??????-????????????' }, '50'],
        [{ en: 'downtown-dubai', ar: '??????-??????-??????????????' }, '41'],
      ] as Array<[{ en: string; ar: string }, string]>
    ).forEach(([value, id]) => {
      it(`should return valid location for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.location]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.locationsIds]: id,
        });
      });

      it(`should return valid city for english ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.location]: value.en,
            },
            'en',

            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.locationsIds]: id,
        });
      });

      it(`should return valid location for arabic ${value.en}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.location]: value.ar,
            },
            'ar',
            '/en/abc'
          ).query
        ).toEqual({
          [FiltersQueryParametersEnum.locationsIds]: id,
        });
      });
    });
  });
});
