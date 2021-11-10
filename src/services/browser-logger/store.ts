/* eslint-disable no-console */
import { datadogLogs, StatusType } from '@datadog/browser-logs';

import { configCommon } from 'config/common';
import { environmentGetDatadog } from 'helpers/environment/get-datadog';
import { helpersIsClient } from 'helpers/is-client';

type LogTypes = 'log' | StatusType;
type LogMethods = keyof Pick<Console, 'log' | 'debug' | 'warn' | 'error' | 'info'>;

/**
 * Datadog logger instance for only client-side
 * and only can be used in client-side
 */
export class BrowserLoggerStore {
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
      service: `pf-web-app-${configCommon.countryCode}`,
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
  };

  /**
   *
   * @description Modify the native console functions to send logs to datadog as well
   */
  private alterConsoleMethods = (): void => {
    const methodsToListens: LogMethods[] = ['log', 'debug', 'warn', 'error', 'info'];

    methodsToListens.forEach((method: LogMethods) => {
      const native = console[method].bind<typeof console[typeof method]>(console);

      console[method] = (...args): void => {
        native(...args);
        const [firstArgument, ...rest] = args;
        const isFirstArgumentString = typeof firstArgument === 'string';

        this.sendLogs(
          method as LogTypes,
          isFirstArgumentString ? firstArgument : 'Generic',
          isFirstArgumentString ? rest : args
        );
      };
    });
  };
}
