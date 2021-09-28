import { BrowserLoggerStore } from './store';

let browserLoggerService: BrowserLoggerStore;

export const BrowserLoggerService = (): BrowserLoggerStore => {
  if (!browserLoggerService) {
    browserLoggerService = new BrowserLoggerStore();
  }
  return browserLoggerService;
};
