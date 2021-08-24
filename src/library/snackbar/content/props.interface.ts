import { ReactNode } from 'react';
import { SnackbarHandlerOptionsInterface } from '../handler-options.interface';

export interface SnackbarContentPropsInterface {
  /**
   * Unique id to identify each message
   */
  id?: string;

  /**
   * CSS classes
   */
  className?: string;

  /**
   * The message to be displayed
   */
  message?: string;

  /**
   * 1 or 2 optional action buttons
   * only button element is allow
   */
  action?: ReactNode;

  /**
   * Number of seconds before it dismiss by its own. [default: 5]
   */
  autoHideDuration?: number;

  /**
   * Triggered when snackbar is close
   */
  onClose?: (options?: SnackbarHandlerOptionsInterface) => void;

  /**
   * Triggered when snackbar is open
   */
  onOpen?: (options?: SnackbarHandlerOptionsInterface) => void;
}
