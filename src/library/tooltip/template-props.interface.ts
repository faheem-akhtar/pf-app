import { TooltipPlacementEnum } from './placement.enum';

export interface TooltipTemplatePropsInterface {
  /**
   * Whether the floating tooltip card is visible or not
   */
  visible: boolean;

  /**
   * The position of the tooltip relative to the target
   * @default bottom
   */
  placement?: TooltipPlacementEnum;

  /**
   * Theme of the tooltip
   * @default true
   */
  dark?: boolean;

  /**
   * Whether the close icon is visible or not
   * @default true
   */
  closeIcon?: boolean;

  /**
   * Additional css class for horizontal placement
   */
  className?: string;
}
