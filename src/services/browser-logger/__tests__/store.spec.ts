/* eslint-disable no-console */
/**
 * @jest-environment jsdom
 */
import { datadogLogs } from '@datadog/browser-logs';

import { mockWindowConsole } from 'mocks/window/console.mock';

import * as helpersIsClientModule from 'helpers/is-client';

import { BrowserLoggerStore } from '../store';

jest.mock('@datadog/browser-logs', () => ({
  datadogLogs: {
    init: jest.fn(),
    logger: {
      log: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      setContext: jest.fn(),
      addContext: jest.fn(),
      removeContext: jest.fn(),
    },
  },
}));

describe('BrowserLoggerStore', () => {
  const { NEXT_PUBLIC_DATADOG_CLIENT_TOKEN } = process.env;
  let browserLogger;
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN = NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
    Object.defineProperty(helpersIsClientModule, 'helpersIsClient', { value: true });

    browserLogger = new BrowserLoggerStore();
    browserLogger.initialize();
  });

  test('if an error is given when client-token is not-exist', () => {
    process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN = '';
    const consoleMock = mockWindowConsole();
    new BrowserLoggerStore();
    expect(consoleMock.error).toHaveBeenCalledTimes(1);
  });

  test('if the instance is initialized', () => {
    expect(datadogLogs.init).toHaveBeenCalledWith(
      expect.objectContaining({
        clientToken: NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
      })
    );
  });

  test('if datadog functions are called in client-side', () => {
    const browserLogger = new BrowserLoggerStore();
    browserLogger.initialize();

    console.log({ testNo: '1' });
    console.info({ testNo: '2' });
    console.debug({ testNo: '3' });
    console.warn({ testNo: '4' });
    console.error({ testNo: '5' });

    expect(datadogLogs.logger.log).toHaveBeenCalledWith('Generic', [{ testNo: '1' }]);
    expect(datadogLogs.logger.info).toHaveBeenCalledWith('Generic', [{ testNo: '2' }]);
    expect(datadogLogs.logger.debug).toHaveBeenCalledWith('Generic', [{ testNo: '3' }]);
    expect(datadogLogs.logger.warn).toHaveBeenCalledWith('Generic', [{ testNo: '4' }]);
    expect(datadogLogs.logger.error).toHaveBeenCalledWith('Generic', [{ testNo: '5' }]);
  });

  it('should use the first argument as message if first argument is strng', () => {
    const browserLogger = new BrowserLoggerStore();
    browserLogger.initialize();

    console.log('my test', { testNo: '1' });

    expect(datadogLogs.logger.log).toHaveBeenCalledWith('my test', [{ testNo: '1' }]);
  });

  test('if datadog functions are not invoked in server-side', () => {
    Object.defineProperty(helpersIsClientModule, 'helpersIsClient', { value: false });
    const browserLogger = new BrowserLoggerStore();
    browserLogger.initialize();

    console.log('lorem ipsum');

    expect(datadogLogs.logger.log).not.toHaveBeenCalledWith('lorem-ipsum');
  });

  it('should return false if runtime is server-side', () => {
    Object.defineProperty(helpersIsClientModule, 'helpersIsClient', { value: false });
    const browserLogger = new BrowserLoggerStore();
    browserLogger.initialize();

    expect(browserLogger['isLoggerCallable']).toBe(false);
  });
});
