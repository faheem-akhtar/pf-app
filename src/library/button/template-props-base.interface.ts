import { FunctionComponent } from 'preact';

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
   * Icon
   */
  icon?: {
    /**
     * Icon component
     */
    component: FunctionComponent<{ class?: string; clipped?: boolean }>;
    /**
     * Icon position
     */
    position: ButtonIconPositionEnum;
  };

  /**
   * Additional css class
   */
  className?: string;

  /**
   * Icon css class
   */
  iconClassName?: string;

  /**
   * Handle button click event
   */
  onClick?: (e?: Event) => void;
}
