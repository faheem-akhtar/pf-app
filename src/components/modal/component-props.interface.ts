import { MutableRefObject } from 'react';

export interface ModalComponentPropsInterface {
  /**
   * A ref to access an element
   */
  openRef: MutableRefObject<() => void>;

  /**
   * A ref to access an element
   */
  closeRef: MutableRefObject<() => void>;

  /**
   * If 'true', the modal background will be overlay
   * @default false
   */
  overlay?: boolean;

  /**
   * container css class
   */
  containerClassName?: string;

  /**
   * invoked when modal is opened
   */
  onOpen?: () => void;

  /**
   * invoked when overlay is clicked
   */
  onOverlayClick?: () => void;
}
