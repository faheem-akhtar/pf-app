import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

// TODO-FE[TPNX-3056] remove this file
export interface DropdownTemplatePropsInterface<T> {
  title: string;
  value: T;
  choices: FiltersValueFieldChoiceInterface<T>[];
  onChange: (value: T) => void;
  className?: string;
}
