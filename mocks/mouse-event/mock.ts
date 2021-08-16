export const MouseEventMock = <T = Element, E = MouseEvent>(): React.MouseEvent<T, E> =>
  ({
    __hint: 'MouseEventMock',
    preventDefault: jest.fn(),
  } as unknown as React.MouseEvent<T, E>);
