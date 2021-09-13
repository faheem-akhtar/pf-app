import { comparatorNonValue } from 'helpers/comparator/non-value';

describe('comparatorNonValue', () => {
  it('return true for falsy values', () => {
    expect(comparatorNonValue('')).toBeTruthy();
    expect(comparatorNonValue(0)).toBeTruthy();
    expect(comparatorNonValue(false)).toBeTruthy();
  });

  it('return false for nullish values', () => {
    expect(comparatorNonValue(null)).toBeFalsy();
    expect(comparatorNonValue(undefined)).toBeFalsy();
  });
});
