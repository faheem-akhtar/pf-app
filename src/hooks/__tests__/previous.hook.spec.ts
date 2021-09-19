import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseRef } from 'mocks/react/use-ref.mock';

import { usePrevious } from '../previous.hook';

describe('usePrevious', () => {
  it('should return undefined for initial call', () => {
    mockReactUseEffect({ callImmediately: false });
    mockReactUseRef();

    const value = 'x';
    const prev = usePrevious(value);

    expect(prev).toEqual(undefined);
  });

  it('should return previous value for the second time', () => {
    const { trigger } = mockReactUseEffect({ callImmediately: false });
    mockReactUseRef();

    const value1 = 'x1';
    usePrevious(value1);
    trigger();
    const value2 = 'x2';
    const prev = usePrevious(value2);

    expect(prev).toEqual(value1);
  });
});
