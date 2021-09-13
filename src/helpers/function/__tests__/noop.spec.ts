import { functionNoop } from 'helpers/function/noop';

describe('functionNoop', () => {
  it('should been called', () => {
    expect(functionNoop()).toBe(undefined);
  });
});
