import { functionSelf } from 'helpers/function/self';

describe('functionSelf', () => {
  it('should return whatever you pass', () => {
    expect(functionSelf(1)).toEqual(1);
    expect(functionSelf('string')).toEqual('string');
    expect(functionSelf({ a: '1' })).toEqual({ a: '1' });
    expect(functionSelf(null)).toEqual(null);
    expect(functionSelf(undefined)).toEqual(undefined);
  });
});
