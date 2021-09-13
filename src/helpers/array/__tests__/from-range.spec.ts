import { arrayFromRange } from 'helpers/array/from-range';

describe('arrayFromRange', () => {
  it('should return array of 3 values starting from 1', () => {
    expect(arrayFromRange(1, 4)).toEqual([1, 2, 3]);
  });

  it('should return array of 4 values starting from 3', () => {
    expect(arrayFromRange(4, -1)).toEqual([4, 3, 2, 1, 0]);
  });

  it('should return array of 4 values with step of 2', () => {
    expect(arrayFromRange(0, 8, 2)).toEqual([0, 2, 4, 6]);
  });

  it('should return array of 3 values', () => {
    expect(arrayFromRange(3)).toEqual([0, 1, 2]);
  });

  it('should return empty array', () => {
    expect(arrayFromRange(0)).toEqual([]);
  });
});
