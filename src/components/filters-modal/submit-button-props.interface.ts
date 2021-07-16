import { FiltersValueInterface } from 'components/filters/value/interface';

export interface FiltersModalSubmitButtonPropsInterface {
  onSubmit: () => void;
  filtersValue: FiltersValueInterface;
}
