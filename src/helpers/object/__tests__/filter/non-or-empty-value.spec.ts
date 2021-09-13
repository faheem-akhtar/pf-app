import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

describe('objectFilterNonOrEmptyValue', () => {
  it('should remove from obj any properties that have falsy values like: null, undefined, NaN, "" ', () => {
    const testProperty: string = 'Joe';
    const undefinedProperty: boolean = false;
    const nullProperty: boolean = false;
    const emptyProperty: string = '';
    const nanProperty: number = NaN;

    const mockObject = {
      testProperty,
      undefinedProperty,
      nullProperty,
      emptyProperty,
      nanProperty,
    };

    expect(objectFilterNonOrEmptyValue(mockObject)).toBe(mockObject);
  });

  it('should not remove any properties from obj that have no falsy value', () => {
    const testProperty: string = 'Joe';
    const anotherTestProperty: string = 'Dave';

    const mockObject = {
      testProperty,
      anotherTestProperty,
    };

    expect(objectFilterNonOrEmptyValue(mockObject)).toBe(mockObject);
  });
});
