import { PropertyCardMenuModalTemplatePropsBaseInterface } from './template-props-base.interface';

export interface PropertyCardMenuModalComponentPropsInterface extends PropertyCardMenuModalTemplatePropsBaseInterface {
  /**
   * A ref to access an element
   */
  openRef: React.MutableRefObject<() => void>;
  /**
   * Ref for modal close
   */
  closeRef?: React.MutableRefObject<() => void>;
}
