import { OpaqueType } from 'types/opaque/type';

import { FiltersValueFieldAmenitiesType } from './amenities.type';
import { FiltersValueFieldChoiceInterface } from './choice.interface';

export type FiltersValueFieldAmenitiesChoiceType = OpaqueType<
  'FiltersValueFieldAmenitiesType',
  FiltersValueFieldChoiceInterface<FiltersValueFieldAmenitiesType>
>;
