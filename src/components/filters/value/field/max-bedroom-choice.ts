import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMaxBedroom } from './max-bedroom';

export type FiltersValueFieldMaxBedroomChoice = Opaque<
  'FiltersValueFieldMaxBedroom',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMaxBedroom>
>;
