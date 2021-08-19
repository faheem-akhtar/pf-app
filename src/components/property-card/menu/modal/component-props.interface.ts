import { PropertyCardMenuModalTemplatePropsBaseInterface } from './template-props-base.interface';

export interface PropertyCardMenuModalComponentPropsInterface extends PropertyCardMenuModalTemplatePropsBaseInterface {
  /**
   * Ref for modal open
   */
  openRef: React.MutableRefObject<() => void>;
}