import { PropertyShareComponentPropsInterface } from '../component-props.interface';

export interface PropertyShareEmailComponentPropsInterface
  extends Omit<PropertyShareComponentPropsInterface, 'openRef'> {
  /**
   * invokes when close is clicked in form-submitted view
   */
  onClickClose: () => void;
}
