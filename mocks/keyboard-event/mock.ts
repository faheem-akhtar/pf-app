export const KeyboardEventMock = <T = Element>(): React.KeyboardEvent<T> =>
  ({
    __hint: 'KeyboardEventMock',
    preventDefault: jest.fn(),
  } as unknown as React.KeyboardEvent<T>);
