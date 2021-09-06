import { SnackbarPropsInterface } from 'library/snackbar/props.interface';

export interface SnackbarContextInterface {
  /**
   * Display an alert message
   */
  alert: (snackbar: Pick<SnackbarPropsInterface, 'message' | 'autoHideDuration' | 'action' | 'onClose'>) => void;

  /**
   * Dismiss the message
   */
  hide: () => void;
}
