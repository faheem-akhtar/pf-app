import { stringCharToNumber } from '../char-to-number';

describe('stringCharToNumber', () => {
  it('should return number representation for char', () => {
    expect(stringCharToNumber('c')).toEqual(99);
  });
});
