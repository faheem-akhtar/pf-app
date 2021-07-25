export interface ChipPropsInterface {
  /**
   * Chip label
   */
  label: string;

  /**
   * Id of related to label input
   */
  htmlFor?: string;

  /**
   * Component template
   */
  template?: (props: ChipPropsInterface) => JSX.Element;

  /**
   * Prefix chip icon
   */
  prefixIcon?: JSX.Element;

  /**
   * Suffix chip icon
   */
  suffixIcon?: JSX.Element;

  /**
   * Class list for element wrapper
   */
  className?: string;

  /**
   * Class list for label
   */
  labelClassName?: string;

  /**
   * Whether or not the chip is selected
   */
  isSelected?: boolean;

  /**
   * Whether or not the chip is disabled
   */
  isDisabled?: boolean;

  /**
   * On chip is clicked
   */
  onClick?(e: MouseEvent): void;
}
