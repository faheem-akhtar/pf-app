import { FiltersContextProviderPropsInterface } from 'components/filters/context-provider-props.interface';
import { FiltersDataMock } from './data.mock';
import { FiltersValueMock } from './value.mock';

export const FiltersContextPropsMock = (): FiltersContextProviderPropsInterface => ({
  filtersValueFromQuery: FiltersValueMock(),
  filtersData: FiltersDataMock,
});
