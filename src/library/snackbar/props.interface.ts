import { SnackbarContentPropsInterface } from './content/props.interface';

export interface SnackbarPropsInterface extends Omit<SnackbarContentPropsInterface, 'className'> {
  /**
   * Whether is visible or not
   */
  visible?: boolean;
}
