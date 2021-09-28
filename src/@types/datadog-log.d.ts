declare global {
  interface Console {
    /**
     * logs the given stack and send it to datadog
     * @param {string | object} context
     * @param {string=} message
     */
    log(context: string | object, message?: string): void;

    /**
     * logs the given stack and send it to datadog
     * @param {string | object} context
     * @param {string=} message
     */
    info(context: string | object, message?: string): void;

    /**
     * logs the given stack and send it to datadog
     * @param {string | object} context
     * @param {string=} message
     */
    warn(context: string | object, message?: string): void;

    /**
     * logs the given stack and send it to datadog
     * @param {string | object} context
     * @param {string=} message
     */
    error(context: string | object, message?: string): void;
  }
}
export = Console;
