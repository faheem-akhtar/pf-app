import { stringMakeBoldWord } from 'helpers/string/make-bold-word';

describe('stringMakeBoldWord', () => {
  it('should return word as bold', () => {
    expect(stringMakeBoldWord('hello')).toEqual(`<b>hello</b>`);
  });
});
