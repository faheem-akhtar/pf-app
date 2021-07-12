import { FunctionComponent } from 'preact';
import { LibraryButtonSizeEnum } from './size.enum';
import { LibraryButtonComponentTypeEnum } from './component-type.enum';
import { ButtonIconPositionEnum } from './icon-position.enum';

export interface ButtonTemplatePropsBaseInterface {
  /**
   * Component type
   */
  componentType: LibraryButtonComponentTypeEnum;

  /**
   * Button size
   */
  size: LibraryButtonSizeEnum;

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
