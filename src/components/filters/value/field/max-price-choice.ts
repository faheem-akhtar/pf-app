import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMaxPrice } from './max-price';

export type FiltersValueFieldMaxPriceChoice = Opaque<
  'FiltersValueFieldMaxPrice',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMaxPrice>
>;
