import { domClassMerge } from 'helpers/dom/class-merge';

describe('domClassMerge', () => {
  it('should return empty string when no arguments are passed', () => {
    expect(domClassMerge()).toEqual('');
  });

  it('should support string class names', () => {
    expect(domClassMerge('first', 'second')).toEqual('first second');
  });

  it('should support numeric class names', () => {
    expect(domClassMerge(1, 2)).toEqual('1 2');
  });

  it('should support undefined arguments and ignore them', () => {
    expect(domClassMerge(undefined)).toEqual('');
    expect(domClassMerge(undefined, 'first')).toEqual('first');
    expect(domClassMerge(undefined, 'first', undefined)).toEqual('first');
  });

  it('should support object arguments with boolean property values', () => {
    expect(domClassMerge({ first: true })).toEqual('first');
    expect(domClassMerge({ first: true }, 'second')).toEqual('first second');
  });

  it(
    'should support object arguments with boolean property values' + 'and ignore keys that have false as a value',
    () => {
      expect(domClassMerge({ first: false })).toEqual('');
      expect(domClassMerge({ first: false }, 'second')).toEqual('second');
    }
  );
});
