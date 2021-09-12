export const keyboardEventStub = <T = Element>(): React.KeyboardEvent<T> =>
  ({
    __hint: 'keyboardEventStub',
    preventDefault: jest.fn(),
  } as unknown as React.KeyboardEvent<T>);
