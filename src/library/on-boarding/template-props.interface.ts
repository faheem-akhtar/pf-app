import { OnBoardingTemplateBaseInterface } from './template-base.interface';

export interface OnBoardingTemplatePropsInterface extends OnBoardingTemplateBaseInterface {
  /**
   * Whether the floating tooltip is visible or not
   * @default false
   */
  visible: boolean;

  /**
   * Specify a callback that will be called when a user clicks close icon
   */
  onClose: () => void;

  /**
   * Ref to access an tooltip base element
   */
  rootRef: React.Ref<HTMLDivElement>;
}
