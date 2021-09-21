import { stringToCamelCase } from '../to-camel-case';

describe('stringToCamelCase', () => {
  it('should convert snack case to calem case', () => {
    expect(stringToCamelCase('my_string')).toEqual('myString');
    expect(stringToCamelCase('this_is_my_string')).toEqual('thisIsMyString');
    expect(stringToCamelCase('this_iS_another_strinG')).toEqual('thisIsAnotherString');

    expect(stringToCamelCase('_string')).toEqual('String');
    expect(stringToCamelCase('my_string_')).toEqual('myString');
  });
});
