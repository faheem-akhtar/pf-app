import { ButtonComponentTypeEnum } from './component-type.enum';
import { ButtonIconPositionEnum } from './icon-position.enum';
import { ButtonSizeEnum } from './size.enum';

export interface ButtonTemplatePropsBaseInterface {
  /**
   * Component type
   */
  componentType: ButtonComponentTypeEnum;

  /**
   * Button size
   */
  size: ButtonSizeEnum;

  /**
   * Is disabled
   */
  disabled?: boolean;

  /**
   * Is loading
   */
  loading?: boolean;

  /**
   * Option to fit button width to its parent width
   */
  fullWidth?: boolean;

  /**
   * Icon
   */
  icon?: {
    /**
     * Icon component
     */
    component: React.FunctionComponent<{ class?: string; clipped?: boolean }>;
    /**
     * Icon position
     */
    position: ButtonIconPositionEnum;

    /**
     * Icon class name
     */
    className?: string;
  };

  /**
   * Additional css class
   */
  className?: string;

  /**
   * Accessible testId from parents
   */
  testId?: string;

  /**
   * Handle button click event
   */
  onClick?: React.MouseEventHandler<Element>;
}
