import { arrayFilterNonValue } from 'helpers/array/filter/non-value';

describe('arrayFilterNonValue', () => {
  it('should not remove non values from an array', () => {
    const array = [0, '', false];

    expect(arrayFilterNonValue(array)).toEqual(array);
  });

  it('should remove falsy values from an array', () => {
    const array = [null, undefined, NaN];

    expect(arrayFilterNonValue(array).length).toEqual(0);
  });
});
