import { ChipChoiceOptionInterface } from './option.interface';

export interface ChipChoiceTemplatePropsInterface<V> {
  /**
   * The list of available options for the select
   */
  options: ChipChoiceOptionInterface<V>[];

  /**
   * Selected option
   */
  selected: V;

  /**
   * Placeholder for non-value option label
   */
  placeholder?: string;

  /**
   * Class list for element
   */
  className?: string;

  /**
   * Class list for container
   */
  containerClassName?: string;

  /**
   * Class list for chips
   */
  chipClassName?: string;

  /**
   * On option is selected
   */
  onCheck(selectedOption: ChipChoiceOptionInterface<V>, e: Event): void;
}
