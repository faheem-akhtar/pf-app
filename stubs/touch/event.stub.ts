export const touchEventStub = <T = Element>(): React.TouchEvent<T> =>
  ({
    __hint: 'touchEventStub',
    preventDefault: jest.fn(),
  } as unknown as React.TouchEvent<T>);
