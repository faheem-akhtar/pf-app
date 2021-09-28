/* eslint-disable no-console */
import { datadogLogs, StatusType } from '@datadog/browser-logs';

import { configCommon } from 'config/common';
import { environmentGetDatadog } from 'helpers/environment/get-datadog';
import { helpersIsClient } from 'helpers/is-client';

type LogTypes = 'log' | StatusType;

/**
 * Datadog logger instance for only client-side
 * and only can be used in client-side
 */
export class BrowserLoggerStore {
  /**
   * native console methods for printing
   */
  public static methods: Pick<Console, LogTypes> = {
    log: console.log,
    info: console.info,
    debug: console.debug,
    warn: console.warn,
    error: console.error,
  };

  /**
   * clientKey for data-dog
   */
  private clientKey = '';

  /**
   * check if the runtime is client-side
   */
  private isLoggerCallable = helpersIsClient;

  /**
   * constructor
   */
  constructor() {
    const { NEXT_PUBLIC_DATADOG_CLIENT_TOKEN } = process.env;
    if (!NEXT_PUBLIC_DATADOG_CLIENT_TOKEN) {
      console.error('NEXT_PUBLIC_DATADOG_CLIENT_TOKEN is mandatory');
      return;
    }
    this.clientKey = NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
  }

  /**
   * initialize datadog-logs
   */
  public initialize(): void {
    datadogLogs.init({
      env: environmentGetDatadog(configCommon.countryCode),
      clientToken: this.clientKey,
      service: 'pf-web-app',
      forwardErrorsToLogs: true,
      sampleRate: 100,
    });

    this.alterConsoleMethods();
  }

  /**
   *
   * @param type log-level
   * @param message message
   * @param messageContext message-context
   */
  private sendLogs = (type: LogTypes, message: string, messageContext?: object): void => {
    if (this.isLoggerCallable) {
      datadogLogs.logger[type](message, messageContext);
    }
    BrowserLoggerStore.methods[type](message, messageContext || '');
  };

  /**
   * alters the native console functions
   */
  private alterConsoleMethods = (): void => {
    console.log = this.alterConsoleMethod('log');
    console.info = this.alterConsoleMethod('info');
    console.debug = this.alterConsoleMethod('debug');
    console.warn = this.alterConsoleMethod('warn');
    console.error = this.alterConsoleMethod('error');
  };

  /**
   * changes native console functions for the given LogTypes
   */
  private alterConsoleMethod(type: LogTypes) {
    return (context: string | object, message?: string): void => {
      const msg = message || '';
      if (typeof context === 'object') {
        this.sendLogs(type, msg, context);
      } else {
        this.sendLogs(type, context as string);
      }
    };
  }
}
