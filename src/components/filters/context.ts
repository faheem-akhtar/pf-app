import React from 'react';

import { FiltersContextInterface } from './context.interface';
import { FiltersDataInterface } from './data/interface';
import { FiltersValueInterface } from './value/interface';

// TODO-FE[CX-411] Add tests
export const FiltersContext = React.createContext<FiltersContextInterface>({
  change: () => null as unknown as FiltersValueInterface,
  set: (value) => value,
  reset: () => null,
  data: null as unknown as FiltersDataInterface,
  value: null as unknown as FiltersValueInterface,
  valueIsDefault: false,
});
