import { comparatorNonValue } from 'helpers/comparator/non-value';

describe('comparatorNonValue', () => {
  it('should return true for falsy values', () => {
    expect(comparatorNonValue('')).toBeTruthy();
    expect(comparatorNonValue(0)).toBeTruthy();
    expect(comparatorNonValue(false)).toBeTruthy();
  });

  it('should return false for nullish values', () => {
    expect(comparatorNonValue(null)).toBeFalsy();
    expect(comparatorNonValue(undefined)).toBeFalsy();
  });

  it('should return false for additional falsy values', () => {
    expect(comparatorNonValue('', ['', false])).toBeFalsy();
    expect(comparatorNonValue(0, [0, false])).toBeFalsy();
    expect(comparatorNonValue(false, [false, 0])).toBeFalsy();
  });

  it('should return true for additional falsy values', () => {
    expect(comparatorNonValue('foo', ['', false, 0])).toBeTruthy();
    expect(comparatorNonValue(10, ['', false, 0])).toBeTruthy();
  });
});
