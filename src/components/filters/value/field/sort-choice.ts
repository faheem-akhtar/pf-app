import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldSort } from './sort';

export type FiltersValueFieldSortChoice = Opaque<
  'FiltersValueFieldSortChoice',
  FiltersValueFieldChoiceInterface<FiltersValueFieldSort>
>;
