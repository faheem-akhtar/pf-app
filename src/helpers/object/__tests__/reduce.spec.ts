import { objectReduce } from 'helpers/object/reduce';

describe('objectReduce', () => {
  it('should iterate through the keys of an object and reduce into the target', () => {
    const obj = {
      num1: 1,
      num2: 2,
      num3: 3,
    };

    expect(
      objectReduce(
        obj,
        (acc, key, value) => {
          acc[key] = value * 2;
          return acc;
        },
        {} as { [key: string]: number }
      )
    ).toEqual({
      num1: 2,
      num2: 4,
      num3: 6,
    });
  });
});
