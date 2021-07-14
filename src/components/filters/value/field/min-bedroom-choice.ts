import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMinBedroom } from './min-bedroom';

export type FiltersValueFieldMinBedroomChoice = Opaque<
  'FiltersValueFieldMinBedroom',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMinBedroom>
>;
