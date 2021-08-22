import { IconTemplatePropsInterface } from 'components/icon/template-props.interface';

export interface PropertyCardMenuContentButtonTemplatePropsInterface {
  /**
   * The label content
   */
  label: string;

  /**
   * The prefix icon for button
   */
  icon?: (props: IconTemplatePropsInterface) => JSX.Element;

  /**
   * Click event when the user press
   */
  onClick: () => void;

  /**
   * Class name
   */
  className?: string;
}
