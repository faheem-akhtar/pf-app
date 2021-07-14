import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldFurnished } from './furnished';

export type FiltersValueFieldFurnishedChoice = Opaque<
  'FiltersValueFieldFurnished',
  FiltersValueFieldChoiceInterface<FiltersValueFieldFurnished>
>;
