import React from 'react';
import { SwitchOptionInterface } from './option.interface';

export interface SwitchTemplatePropsInterface<V> {
  /**
   * The list of available options for the switch
   */
  options: SwitchOptionInterface<V>[];

  /**
   * Selected option
   */
  selected: V;

  /**
   * Class list for element
   */
  className?: string;

  /**
   * On option is selected
   */
  onCheck(selectedOption: SwitchOptionInterface<V>, e?: React.MouseEvent): void;
}
