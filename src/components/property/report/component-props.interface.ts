import { TFunctionType } from 'types/t-function/type';

export interface PropertyReportComponentPropsInterface {
  /**
   * A ref to access an element
   */
  openRef: React.MutableRefObject<() => void>;

  /**
   * Id of the property
   */
  propertyId: string;

  /**
   * Translate function
   */
  t: TFunctionType;
}
