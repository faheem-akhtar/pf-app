export const KeyboardEventMock = (): KeyboardEvent =>
  ({
    __hint: 'KeyboardEventMock',
    preventDefault: jest.fn(),
  } as unknown as KeyboardEvent);
