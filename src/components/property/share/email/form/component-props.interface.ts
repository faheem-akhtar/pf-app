import { TFunctionType } from 'helpers/t-function/type';

export interface PropertyShareEmailFormComponentPropsInterface {
  /**
   * property id to share
   */
  propertyId: string;
  /**
   * translation function
   */
  t: TFunctionType;

  /**
   * invokes when form is successfully sent
   */
  onFormSubmitted: () => void;
}
