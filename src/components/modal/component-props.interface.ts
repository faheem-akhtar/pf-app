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
   * Content wrapped by ModalComponent.
   */
  children: React.ReactNode;

  /**
   * If 'true', the modal background will be overlay
   * @default false
   */
  overlay?: boolean;

  /**
   * invoked when modal is opened
   */
  onOpen?: () => void;
}
