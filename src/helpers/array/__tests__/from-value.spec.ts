import { arrayFromValue } from 'helpers/array/from-value';

describe('arrayFromValue()', () => {
  it('should return an array if the value is an array', () => {
    expect(arrayFromValue([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should return an array with the value if the value is not an array', () => {
    expect(arrayFromValue(1)).toEqual([1]);
  });

  it('returns an empty array if value is empty', () => {
    expect(arrayFromValue('')).toEqual([]);
    expect(arrayFromValue(null)).toEqual([]);
    expect(arrayFromValue(undefined)).toEqual([]);
    expect(arrayFromValue(NaN)).toEqual([]);
  });
});
