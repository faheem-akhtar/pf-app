import { AnyValueType } from 'types/any/value.type';

export type ApiMakeFactoryPropsBaseType = {
  /**
   * Origin of the website. Example: https://propertyfinder.ae
   */
  getOrigin: () => string;
  /**
   * Map the data returned from the server
   */
  dataMapper?: (data: AnyValueType) => AnyValueType;
  /**
   * Alter headers
   * called on every request letting set custom headers for each request
   */
  alterHeaders?: (headers: Record<string, string>) => void;
};
