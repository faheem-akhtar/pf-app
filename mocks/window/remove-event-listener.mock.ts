import { WindowService } from 'services/window/service';

const original = WindowService.removeEventListener;

/**
 * Mock window add event listener
 */
export const mockWindowRemoveEventListener = (): jest.Mock => {
  const mock = jest.fn();
  WindowService.removeEventListener = mock;
  return mock;
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const recoverWindowRemoveEventListener = (): void => {
  WindowService.removeEventListener = original;
};
