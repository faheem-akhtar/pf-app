export const mouseEventStub = <T = Element, E = MouseEvent>(): React.MouseEvent<T, E> =>
  ({
    __hint: 'mouseEventStub',
    preventDefault: jest.fn(),
  } as unknown as React.MouseEvent<T, E>);
