import { stringToSnakeCase } from '../to-snake-case';

describe('stringToSnakeCase', () => {
  it('should convert camel case to snack case', () => {
    expect(stringToSnakeCase('myString')).toEqual('my_string');
    expect(stringToSnakeCase('thisIsMyString')).toEqual('this_is_my_string');
  });

  it('should convert pascal case to snack case', () => {
    expect(stringToSnakeCase('MyString')).toEqual('my_string');
    expect(stringToSnakeCase('ThisIsMyString')).toEqual('this_is_my_string');

    expect(stringToSnakeCase('MyStringA')).toEqual('my_string_a');
  });
});
