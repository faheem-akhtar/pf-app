import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldPropertyTypeId } from './property-type-id';

export type FiltersValueFieldPropertyTypeIdChoice = Opaque<
  'FiltersValueFieldPropertyTypeIdChoice',
  FiltersValueFieldChoiceInterface<FiltersValueFieldPropertyTypeId>
>;
