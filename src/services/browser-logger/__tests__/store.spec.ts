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
    BrowserLoggerStore.methods = {
      log: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
    };
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

    console.log({ lorem: 'ipsum' });
    console.info({ lorem: 'ipsum' });
    console.debug({ lorem: 'ipsum' });
    console.warn({ lorem: 'ipsum' });
    console.error({ lorem: 'ipsum' });

    expect(datadogLogs.logger.log).toHaveBeenCalledWith('', { lorem: 'ipsum' });
    expect(BrowserLoggerStore.methods.log).toHaveBeenCalledWith('', { lorem: 'ipsum' });

    expect(datadogLogs.logger.info).toHaveBeenCalledWith('', { lorem: 'ipsum' });
    expect(BrowserLoggerStore.methods.info).toHaveBeenCalledWith('', { lorem: 'ipsum' });

    expect(datadogLogs.logger.debug).toHaveBeenCalledWith('', { lorem: 'ipsum' });
    expect(BrowserLoggerStore.methods.debug).toHaveBeenCalledWith('', { lorem: 'ipsum' });

    expect(datadogLogs.logger.warn).toHaveBeenCalledWith('', { lorem: 'ipsum' });
    expect(BrowserLoggerStore.methods.warn).toHaveBeenCalledWith('', { lorem: 'ipsum' });

    expect(datadogLogs.logger.error).toHaveBeenCalledWith('', { lorem: 'ipsum' });
    expect(BrowserLoggerStore.methods.error).toHaveBeenCalledWith('', { lorem: 'ipsum' });
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
