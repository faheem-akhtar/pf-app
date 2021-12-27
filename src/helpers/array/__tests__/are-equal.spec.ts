import { arrayAreEqual } from 'helpers/array/are-equal';

describe('areEqual', () => {
  it('should return true for equal arrays', () => {
    expect(arrayAreEqual([], [])).toBeTruthy();
    expect(arrayAreEqual(['1', '2', '3'], ['1', '2', '3'])).toBeTruthy();
    expect(arrayAreEqual(['1', '2', '3'], ['2', '1', '3'])).toBeTruthy();
  });

  it('should return false for non-equal arrays', () => {
    expect(arrayAreEqual(['1', '2', '3'], ['1', '3'])).toBeFalsy();
  });

  it('should accept a comparator to determine equality and priority', () => {
    const mockComparator = (item1: { id: number }, item2: { id: number }): 1 | 0 | -1 => {
      if (item1.id === item2.id) {
        return 0;
      } else {
        return item1.id < item2.id ? -1 : 1;
      }
    };

    expect(
      arrayAreEqual([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 3 }, { id: 1 }, { id: 2 }], mockComparator)
    ).toBeTruthy();
    expect(
      arrayAreEqual([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 3 }, { id: 1 }, { id: 5 }], mockComparator)
    ).toBeFalsy();
  });
});
