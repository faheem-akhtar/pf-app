import { MutableRefObject } from 'react';

export interface ModalComponentPropsInterface {
  openRef: MutableRefObject<() => void>;
  closeRef: MutableRefObject<() => void>;
  children: React.ReactNode;
}
