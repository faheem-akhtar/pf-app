import React from 'react';

import { FiltersContextInterface } from './context.interface';
import { FiltersDataInterface } from './data/interface';
import { FiltersValueInterface } from './value/interface';

export const FiltersContext = React.createContext<FiltersContextInterface>({
  update: (value) => value,
  data: null as unknown as FiltersDataInterface,
  value: null as unknown as FiltersValueInterface,
});
