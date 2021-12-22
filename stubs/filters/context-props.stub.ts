import { FiltersContextProviderPropsInterface } from 'components/filters/context-provider-props.interface';

import { filtersDataStub } from './data.stub';
import { filtersValueStub } from './value/stub';

export const filtersContextPropsStub = (): FiltersContextProviderPropsInterface => ({
  filtersValueFromQuery: filtersValueStub(),
  filtersData: filtersDataStub,
});
