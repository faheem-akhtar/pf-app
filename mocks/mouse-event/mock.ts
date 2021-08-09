export const MouseEventMock = (): MouseEvent =>
  ({
    __hint: 'MouseEventMock',
    preventDefault: jest.fn(),
  } as unknown as MouseEvent);
