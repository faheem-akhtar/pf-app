import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMinBathroom } from './min-bathroom';

export type FiltersValueFieldMinBathroomChoice = Opaque<
  'FiltersValueFieldMinBathroom',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMinBathroom>
>;
