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
      [FiltersQueryParametersEnum.minBedroom]: '3',
      [FiltersQueryParametersEnum.maxBedroom]: '3',
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
      [FiltersQueryParametersEnum.minBedroom]: '0',
      [FiltersQueryParametersEnum.maxBedroom]: '0',
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
        } as FiltersQueryParamInterface,
        'en',
        '/en/abc'
      ).query
    ).toEqual({
      [FiltersQueryParametersEnum.locationsIds]: '73',
      [FiltersQueryParametersEnum.categoryId]: '1',
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
        [{ en: 'rent', ar: 'للايجار' }, '2'],
        [{ en: 'buy', ar: 'للبيع' }, '1'],
        [{ en: 'commercial-rent', ar: 'تجارية-للايجار' }, '4'],
        [{ en: 'commercial-buy', ar: 'تجارية-للبيع' }, '3'],
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
        [{ en: 'apartments', ar: 'شقق' }, '1'],
        [{ en: 'penthouses', ar: 'بنتهاوس' }, '20'],
        [{ en: 'villas', ar: 'فلل' }, '35'],
        [{ en: 'duplexes', ar: 'دوبلكس' }, '24'],
        [{ en: 'hotels-hotel-apartments', ar: 'فنادق-شقق-فندقية' }, '45'],
        [{ en: 'whole-buildings', ar: 'عمارة-بالكامل' }, '10'],
        [{ en: 'bulk-sale-units', ar: 'مجمع-للبيع' }, '30'],
        [{ en: 'bulk-rent-units', ar: 'مجمعات-للإيجار' }, '34'],
        [{ en: 'full-floors', ar: 'طابق-كامل' }, '18'],
        [{ en: 'land', ar: 'اراضي' }, '5'],
        [{ en: 'townhouses', ar: 'تاون-هاوس' }, '22'],
        [{ en: 'half-floors', ar: 'نصف-طابق' }, '29'],
        [{ en: 'compounds', ar: 'مجمعات-سكنية' }, '42'],
        [{ en: 'bungalows', ar: 'بانجلو' }, '31'],
        [{ en: 'offices', ar: 'مكاتب' }, '4'],
        [{ en: 'retail-spaces', ar: 'محلات' }, '27'],
        [{ en: 'warehouses', ar: 'مستودعات' }, '13'],
        [{ en: 'shops', ar: 'متاجر' }, '21'],
        [{ en: 'showrooms', ar: 'صالات-عرض' }, '12'],
        [{ en: 'factories', ar: 'مصانع' }, '44'],
        [{ en: 'labor-camps', ar: 'سكن-عمال' }, '11'],
        [{ en: 'staff-accommodation', ar: 'سكن-موظفين' }, '43'],
        [{ en: 'business-centres', ar: 'مراكز-أعمال' }, '48'],
        [{ en: 'co-working-spaces', ar: 'مكاتب-عمل-جماعي' }, '49'],
        [{ en: 'farms', ar: 'مزارع' }, '50'],
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
        [{ en: 'studio', ar: 'استوديو' }, '0'],
        [{ en: '1-bedroom', ar: '1-غرفة-نوم' }, '1'],
        [{ en: '2-bedroom', ar: '2-غرفة-نوم' }, '2'],
        [{ en: '3-bedroom', ar: '3-غرفة-نوم' }, '3'],
        [{ en: '4-bedroom', ar: '4-غرفة-نوم' }, '4'],
        [{ en: '5-bedroom', ar: '5-غرفة-نوم' }, '5'],
        [{ en: '6-bedroom', ar: '6-غرفة-نوم' }, '6'],
        [{ en: '7-bedroom', ar: '7-غرفة-نوم' }, '7'],
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
          [FiltersQueryParametersEnum.minBedroom]: id,
          [FiltersQueryParametersEnum.maxBedroom]: id,
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
          [FiltersQueryParametersEnum.minBedroom]: id,
          [FiltersQueryParametersEnum.maxBedroom]: id,
        });
      });
    });
  });

  describe('furnish', () => {
    ([[{ en: 'furnished', ar: 'مفروشة' }, '1']] as Array<[{ en: string; ar: string }, string]>).forEach(
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
    ([[{ en: 'monthly', ar: 'شهري' }, 'm']] as Array<[{ en: string; ar: string }, string]>).forEach(([value, id]) => {
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
        [{ en: 'dubai', ar: 'دبي' }, '1'],
        [{ en: 'dubai-marina', ar: 'دبي-مارينا' }, '50'],
        [{ en: 'downtown-dubai', ar: 'دبي-وسط-المدينة' }, '41'],
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
