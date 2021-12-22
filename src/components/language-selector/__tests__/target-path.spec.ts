import { languageSelectorTargetPath } from '../target-path';

describe('languageSelectorTargetPath', () => {
  it('should return an Arabic url', () => {
    expect(
      languageSelectorTargetPath(
        '/categorySlug/propertyTypeSlug-saleType.html',
        '/buy/apartments-for-sale.html',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للبيع/شقق-للبيع.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/propertyTypeSlug-saleType-locationSlug.html',
        '/rent/dubai/apartments-for-rent-dubai-marina.html',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/شقق-للايجار-دبي-مارينا.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/furnishSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        '/rent/dubai/furnished-apartments-for-rent-dubai-marina-monthly.html',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/مفروشة-شقق-للايجار-دبي-مارينا-شهري.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/furnishSlug-bedroomSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        '/rent/dubai/furnished-1-bedroom-apartments-for-rent-dubai-marina-monthly.html',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للايجار/دبي/مفروشة-1-غرفة-نوم-شقق-للايجار-دبي-مارينا-شهري.html"`);
  });

  it('should return an english url', () => {
    expect(
      languageSelectorTargetPath('/categorySlug/propertyTypeSlug-saleType.html', '/للبيع/شقق-للبيع.html', 'ar', 'en')
    ).toMatchInlineSnapshot(`"/buy/apartments-for-sale.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/propertyTypeSlug-saleType-locationSlug.html',
        '/للايجار/دبي/شقق-للايجار-دبي-مارينا.html',
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/apartments-for-rent-dubai-marina.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/furnishSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        '/للايجار/دبي/مفروشة-شقق-للايجار-دبي-مارينا-شهري.html',
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/furnished-apartments-for-rent-dubai-marina-monthly.html"`);

    expect(
      languageSelectorTargetPath(
        '/categorySlug/citySlug/furnishSlug-bedroomSlug-propertyTypeSlug-saleType-locationSlug-priceType.html',
        '/للايجار/دبي/مفروشة-1-غرفة-نوم-شقق-للايجار-دبي-مارينا-شهري.html',
        'ar',
        'en'
      )
    ).toMatchInlineSnapshot(`"/rent/dubai/furnished-1-bedroom-apartments-for-rent-dubai-marina-monthly.html"`);
  });

  it("should return the same path if didn't match", () => {
    expect(
      languageSelectorTargetPath(
        '/categorySlug/propertyTypeSlug-saleType.html',
        '/dubai/apart-in-marina.html',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/dubai/apart-in-marina.html"`);
  });

  it('should keep the query strings', () => {
    expect(
      languageSelectorTargetPath(
        '/categorySlug/propertyTypeSlug-saleType.html',
        '/buy/apartments-for-sale.html?page=1',
        'en',
        'ar'
      )
    ).toMatchInlineSnapshot(`"/للبيع/شقق-للبيع.html?page=1"`);
  });
});
