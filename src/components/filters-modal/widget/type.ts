import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { TFunctionType } from 'helpers/t-function/type';

export type FiltersModalWidgetType = React.FunctionComponent<{
  filtersValue: FiltersValueInterface;
  filtersData: FiltersDataInterface;
  changeFiltersValue: (newState: FiltersValueInterface) => FiltersValueInterface;
  t: TFunctionType;
}>;
