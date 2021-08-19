import { stringToNumber } from '../to-number';

describe('stringToNumber', () => {
  it('should parse the string to number', () => {
    expect(stringToNumber('101')).toEqual(101);
  });

  it('should return undefined if input is not valid', () => {
    expect(stringToNumber('abc')).toBeUndefined();
    expect(stringToNumber('')).toBeUndefined();
    expect(stringToNumber(null as unknown as string)).toBeUndefined();
  });
});
