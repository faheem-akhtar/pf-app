export interface ErrorViewPropsInterface {
  /**
   * Status code
   * @example 404
   */
  statusCode?: number;

  /**
   * Message
   * @example This broker can't be found
   */
  error?: string;
}
