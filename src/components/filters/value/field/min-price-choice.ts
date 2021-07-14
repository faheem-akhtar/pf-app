import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMinPrice } from './min-price';

export type FiltersValueFieldMinPriceChoice = Opaque<
  'FiltersValueFieldMinPrice',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMinPrice>
>;
