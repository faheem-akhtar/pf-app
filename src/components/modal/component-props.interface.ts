import { MutableRefObject } from 'react';

export interface ModalComponentPropsInterface {
  /**
   * Ref for modal open
   */
  openRef: MutableRefObject<() => void>;

  /**
   * Ref for modal close
   */
  closeRef: MutableRefObject<() => void>;

  /**
   * Children component
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
