import { backendApiSeoLinksToFilterQueryParams } from '../to-filter-query-params';

describe('backendApiSeoLinksToFilterQueryParams()', () => {
  it('should only include FiltersQueryParamInterface keys', () => {
    expect(
      backendApiSeoLinksToFilterQueryParams({
        categorySlug: 'rent',
        propertyTypeSlug: 'properties',
        saleType: 'for-rent',
        pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        page: 2,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "categorySlug": "rent",
        "propertyTypeSlug": "properties",
        "saleType": "for-rent",
      }
    `);
  });
});
