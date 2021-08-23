const originalConsole = global.console;

export const mockConsole = (): Console => {
  global.console = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  } as unknown as Console;

  return global.console;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverConsole = (): void => {
  global.console = originalConsole;
};
