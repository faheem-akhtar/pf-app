export const TouchEventMock = (): TouchEvent =>
  ({
    __hint: 'TouchEventMock',
    preventDefault: jest.fn(),
  } as unknown as TouchEvent);
