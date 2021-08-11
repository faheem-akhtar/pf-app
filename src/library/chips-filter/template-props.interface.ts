import { ChipsFilterIconPositionEnum } from './icon-position.enum';
import { ChipsFilterOptionInterface } from './option.interface';

export interface ChipsFilterTemplatePropsInterface<V> {
  /**
   * Class list for element
   */
  containerClassName?: string;

  /**
   * The list of available options for the multi-select
   */
  options: ChipsFilterOptionInterface<V>[];

  /**
   * The list of selected options for the multi-select
   */
  selected: V[];

  /**
   * The icon to display when chip is selected
   */
  selectedIcon?: React.FunctionComponent<{ class?: string; clipped?: boolean }>;

  /**
   * The position of the icon
   */
  iconPosition?: ChipsFilterIconPositionEnum;

  /**
   * On option is selected
   */
  onCheck(selectedOptions: V[], e: Event): void;
}
