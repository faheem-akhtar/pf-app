import { WindowService } from 'services/window/service';

const original = WindowService.addEventListener;

/**
 * Mock window add event listener
 */
export const mockWindowAddEventListener = (): jest.Mock => {
  const mock = jest.fn();
  WindowService.addEventListener = mock;
  return mock;
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const recoverWindowAddEventListener = (): void => {
  WindowService.addEventListener = original;
};
