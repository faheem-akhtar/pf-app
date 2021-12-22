import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';

import { backendFiltersQueryParamTranslate } from '../param-translate';

describe('backendFiltersQueryParamTranslate()', () => {
  it('should translate params value into arabic', () => {
    expect(
      backendFiltersQueryParamTranslate(
        {
          [FiltersQueryParamEnum.category]: 'buy',
          [FiltersQueryParamEnum.propertyType]: 'apartments',
          [FiltersQueryParamEnum.saleType]: 'for-sale',
        },

        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`
      Object {
        "categorySlug": "للبيع",
        "propertyTypeSlug": "شقق",
        "saleType": "للبيع",
      }
    `);

    expect(
      backendFiltersQueryParamTranslate(
        {
          [FiltersQueryParamEnum.category]: 'rent',
          [FiltersQueryParamEnum.city]: 'dubai',
          [FiltersQueryParamEnum.bedroom]: '2-bedroom',
          [FiltersQueryParamEnum.propertyType]: 'apartments',
          [FiltersQueryParamEnum.saleType]: 'for-rent',
          [FiltersQueryParamEnum.location]: 'dubai-marina',
        },

        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`
      Object {
        "bedroomSlug": "2-غرفة-نوم",
        "categorySlug": "للايجار",
        "citySlug": "دبي",
        "locationSlug": "دبي-مارينا",
        "propertyTypeSlug": "شقق",
        "saleType": "للايجار",
      }
    `);

    expect(
      backendFiltersQueryParamTranslate(
        {
          [FiltersQueryParamEnum.category]: 'rent',
          [FiltersQueryParamEnum.city]: 'dubai',
          [FiltersQueryParamEnum.furnish]: 'furnished',
          [FiltersQueryParamEnum.bedroom]: 'studio',
          [FiltersQueryParamEnum.propertyType]: 'apartments',
          [FiltersQueryParamEnum.saleType]: 'for-rent',
          [FiltersQueryParamEnum.location]: 'dubai-marina',
          [FiltersQueryParamEnum.priceType]: 'monthly',
        },

        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`
      Object {
        "bedroomSlug": "استوديو",
        "categorySlug": "للايجار",
        "citySlug": "دبي",
        "furnishSlug": "مفروشة",
        "locationSlug": "دبي-مارينا",
        "priceType": "شهري",
        "propertyTypeSlug": "شقق",
        "saleType": "للايجار",
      }
    `);
  });

  it('should ignore the invalid values', () => {
    expect(
      backendFiltersQueryParamTranslate(
        {
          [FiltersQueryParamEnum.category]: 'invalid',
          [FiltersQueryParamEnum.propertyType]: 'invalid',
          [FiltersQueryParamEnum.bedroom]: 'invalid',
          [FiltersQueryParamEnum.city]: 'invalid',
          [FiltersQueryParamEnum.location]: 'invalid',
          [FiltersQueryParamEnum.priceType]: 'invalid',
          [FiltersQueryParamEnum.furnish]: 'invalid',
          [FiltersQueryParamEnum.saleType]: 'invalid',
        },
        'en',
        'ar'
      )
    ).toEqual({});
  });

  it('should work with properties as property type', () => {
    expect(
      backendFiltersQueryParamTranslate(
        {
          [FiltersQueryParamEnum.propertyType]: 'properties',
        },
        'en',
        'ar'
      )
    ).toEqual({ propertyTypeSlug: 'عقارات' });
  });
});
