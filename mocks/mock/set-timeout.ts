import { TimeService } from 'services/time/service';

const original = TimeService.setTimeout;

/**
 * Mock set timeout and allow to flush them using the returned function
 * @returns flush set timeouts
 */
export const mockSetTimeout = (): (() => void) => {
  const setTimeoutCallbacks: Function[] = [];

  TimeService.setTimeout = (
    fn: Function,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timeMs?: number
  ): number => {
    setTimeoutCallbacks.push(fn);
    return 0;
  };

  return (): void => {
    setTimeoutCallbacks.forEach((cb) => cb());
    setTimeoutCallbacks.length = 0;
  };
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverSetTimeout = (): void => {
  TimeService.setTimeout = original;
};
