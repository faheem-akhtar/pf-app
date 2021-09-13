import { arrayRemoveDuplicates } from 'helpers/array/remove-duplicates';

describe('arrayRemoveDuplicates', () => {
  it('should return unique array values', () => {
    expect(arrayRemoveDuplicates([1, 1, 2, 3])).toEqual([1, 2, 3]);
    expect(
      arrayRemoveDuplicates([
        [1, 1],
        [1, 2],
        [1, 1],
      ])
    ).toEqual([
      [1, 1],
      [1, 2],
    ]);
    expect(arrayRemoveDuplicates([{ a: 1 }, { a: 1 }], (item) => item.a)).toEqual([{ a: 1 }]);
  });
});
