export interface ApiMakeFactoryPropsInterface {
  /**
   * Origin of the website. Example: https://propertyfinder.ae
   */
  getOrigin: () => string;
  /**
   * Map the data returned from the server
   */
  dataMapper?: <I, O>(json: I) => O;
  /**
   * Alter headers
   * called on every request letting set custom headers for each request
   */
  alterHeaders?: (headers: Record<string, string>) => void;
}
