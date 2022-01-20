const originalConsole = global.console;

export const mockWindowConsole = (): Console => {
  global.console = {
    log: jest.spyOn(global.console, 'log'),
    error: jest.fn(),
    warn: jest.spyOn(global.console, 'warn'),
    info: jest.spyOn(global.console, 'info'),
  } as unknown as Console;

  return global.console;
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const recoverWindowConsole = (): void => {
  global.console = originalConsole;
};
