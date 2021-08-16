export const TouchEventMock = <T = Element>(): React.TouchEvent<T> =>
  ({
    __hint: 'TouchEventMock',
    preventDefault: jest.fn(),
  } as unknown as React.TouchEvent<T>);
