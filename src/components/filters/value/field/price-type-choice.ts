import { Opaque } from '../../../../helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldPriceType } from './price-type';

export type FiltersValueFieldPriceTypeChoice = Opaque<
  'FiltersValueFieldPriceType',
  FiltersValueFieldChoiceInterface<FiltersValueFieldPriceType>
>;
