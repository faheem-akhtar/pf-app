import { FiltersDataInterface } from './data/interface';
import { FiltersValueInterface } from './value/interface';

export interface FiltersContextInterface {
  update: (updater: (value: FiltersValueInterface) => FiltersValueInterface) => void;
  data: FiltersDataInterface;
  value: FiltersValueInterface;
}
