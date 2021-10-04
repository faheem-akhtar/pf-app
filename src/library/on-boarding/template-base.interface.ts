import { OnBoardingPlacementEnum } from './placement.enum';

export interface OnBoardingTemplateBaseInterface {
  /**
   * The position of the tooltip relative to the target
   * @default bottom
   */
  placement?: OnBoardingPlacementEnum;

  /**
   * Additional css class for horizontal placement
   */
  className?: string;

  /**
   * Additional css class for arrow
   */
  arrowClassName?: string;

  /**
   * Trigger when tooltip is close
   */
  onClose?: () => void;
}
