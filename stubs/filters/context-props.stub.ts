import { FiltersContextProviderPropsInterface } from 'components/filters/context-provider-props.interface';
import { FiltersValueInterface } from 'components/filters/value/interface';

import { filtersDataStub } from './data.stub';
import { filtersValueStub } from './value/stub';

export const filtersContextPropsStub = (
  values: Partial<FiltersValueInterface> = {}
): FiltersContextProviderPropsInterface => ({
  filtersValueFromQuery: filtersValueStub(values),
  filtersData: filtersDataStub(),
});
