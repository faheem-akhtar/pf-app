import { stringMakeCaseInsensitiveTester } from '../make-case-insensitive-tester';

describe('stringMakeCaseInsensetiveTester', () => {
  it('should return true for "ab" and "AB"', () => {
    const matchsInsensitiveToAb = stringMakeCaseInsensitiveTester('ab');
    expect(matchsInsensitiveToAb(' AB ')).toBe(true);
  });
  it('should return false for "ab" and "a b"', () => {
    const equalInsensitiveToAb = stringMakeCaseInsensitiveTester('ab');
    expect(equalInsensitiveToAb('a b')).toBe(false);
  });
});
