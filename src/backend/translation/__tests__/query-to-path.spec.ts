import { backendTranslationQueryToPath } from '../query-to-path';

describe('languageSelectorTargetPath', () => {
  it('should return an Arabic url', () => {
    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'buy',
          propertyTypeSlug: 'apartments',
          saleType: 'for-sale',
          pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        },
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للبيع/شقق-للبيع.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'rent',
          citySlug: 'dubai',
          propertyTypeSlug: 'apartments',
          saleType: 'for-rent',
          locationSlug: 'dubai-marina',
          pattern: '/categorySlug/citySlug/propertyTypeSlug-saleType-locationSlug.html',
        },
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/شقق-للايجار-دبي-مارينا.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'rent',
          citySlug: 'dubai',
          furnishSlug: 'furnished',
          propertyTypeSlug: 'apartments',
          saleType: 'for-rent',
          locationSlug: 'dubai-marina',
          priceType: 'monthly',
          pattern: '/categorySlug/citySlug/furnishSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        },
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/مفروشة-شقق-للايجار-دبي-مارينا-شهري.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'rent',
          citySlug: 'dubai',
          furnishSlug: 'furnished',
          bedroomSlug: '1-bedroom',
          propertyTypeSlug: 'apartments',
          saleType: 'for-rent',
          locationSlug: 'dubai-marina',
          priceType: 'monthly',
          pattern:
            '/categorySlug/citySlug/furnishSlug-bedroomSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        },
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/مفروشة-1-غرفة-نوم-شقق-للايجار-دبي-مارينا-شهري.html"`);
  });

  it('should return an english url', () => {
    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'للبيع',
          propertyTypeSlug: 'شقق',
          saleType: 'للبيع',
          pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        },
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/buy/apartments-for-sale.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'للايجار',
          citySlug: 'دبي',
          propertyTypeSlug: 'شقق',
          saleType: 'للايجار',
          locationSlug: 'دبي-مارينا',
          pattern: '/categorySlug/citySlug/propertyTypeSlug-saleType-locationSlug.html',
        },
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/apartments-for-rent-dubai-marina.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'للايجار',
          citySlug: 'دبي',
          furnishSlug: 'مفروشة',
          propertyTypeSlug: 'شقق',
          saleType: 'للايجار',
          locationSlug: 'دبي-مارينا',
          priceType: 'شهري',
          pattern: '/categorySlug/citySlug/furnishSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        },
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/furnished-apartments-for-rent-dubai-marina-monthly.html"`);

    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'للايجار',
          citySlug: 'دبي',
          furnishSlug: 'مفروشة',
          bedroomSlug: '1-غرفة-نوم',
          propertyTypeSlug: 'شقق',
          saleType: 'للايجار',
          locationSlug: 'دبي-مارينا',
          priceType: 'شهري',
          pattern:
            '/categorySlug/citySlug/furnishSlug-bedroomSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        },
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/furnished-1-bedroom-apartments-for-rent-dubai-marina-monthly.html"`);
  });

  it('should translate to english url for encoded values too', () => {
    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: encodeURI('للبيع'),
          propertyTypeSlug: encodeURI('شقق'),
          saleType: encodeURI('للبيع'),
          pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        },
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/buy/apartments-for-sale.html"`);
  });

  it("should return null if didn't match", () => {
    expect(
      backendTranslationQueryToPath(
        {
          citySlug: 'dubai',
          propertyTypeSlug: 'apart',
          locationSlug: 'marina',
          pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        },
        'en',
        'ar'
      )
    ).toBeNull();
  });

  it('should return null if pattern is missing', () => {
    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'buy',
          propertyTypeSlug: 'apartments',
          saleType: 'for-sale',
        },
        'en',
        'ar'
      )
    ).toBeNull();
  });

  it('should keep the query strings', () => {
    expect(
      backendTranslationQueryToPath(
        {
          categorySlug: 'buy',
          propertyTypeSlug: 'apartments',
          saleType: 'for-sale',
          pattern: '/categorySlug/propertyTypeSlug-saleType.html',
          page: '1',
        },
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للبيع/شقق-للبيع.html?page=1"`);
  });
});
