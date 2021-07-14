import { Opaque } from 'helpers/types';

import { FiltersValueFieldAmenities } from './amenities';
import { FiltersValueFieldChoiceInterface } from './choice.interface';

export type FiltersValueFieldAmenitiesChoice = Opaque<
  'FiltersValueFieldAmenities',
  FiltersValueFieldChoiceInterface<FiltersValueFieldAmenities>
>;
