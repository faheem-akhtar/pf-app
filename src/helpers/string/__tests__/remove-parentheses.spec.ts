import { stringRemoveParentheses } from 'helpers/string/remove-parentheses';

describe('stringRemoveParentheses', () => {
  it('should omit content after first parentheses', () => {
    expect(stringRemoveParentheses('3 Years (36 installments)')).toEqual('3 Years');
  });
});
