import { FiltersDataInterface } from './data/interface';
import { FiltersValueInterface } from './value/interface';

export interface FiltersContextProviderPropsInterface {
  filtersValueFromQuery: FiltersValueInterface;
  filtersData: FiltersDataInterface;
}
