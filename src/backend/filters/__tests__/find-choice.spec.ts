import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { backendFiltersFindChoice } from '../find-choice';

describe('backendFiltersFindChoice()', () => {
  it('should find a choice based on slug', () => {
    expect(backendFiltersFindChoice('en', FiltersParametersEnum.categoryId, 'rent')).toMatchInlineSnapshot(`
      Object {
        "label": "Rent",
        "slug": Array [
          "rent",
        ],
        "value": "2",
      }
    `);
  });

  it('should accept a predicate function', () => {
    expect(backendFiltersFindChoice('en', FiltersParametersEnum.bedrooms, (value) => value.label === 'Studio'))
      .toMatchInlineSnapshot(`
    Object {
      "label": "Studio",
      "slug": Array [
        "studios",
        "studio",
      ],
      "value": "0",
    }
    `);
  });

  it('should return undefined if choice not found', () => {
    expect(
      backendFiltersFindChoice('en', FiltersParametersEnum.propertyTypeId, 'invalid-property-type')
    ).toBeUndefined();
  });
});
