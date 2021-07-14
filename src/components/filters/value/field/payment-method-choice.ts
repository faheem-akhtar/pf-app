import { Opaque } from '../../../../helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldPaymentMethod } from './payment-method';

export type FiltersValueFieldPaymentMethodChoice = Opaque<
  'FiltersValueFieldPaymentMethod',
  FiltersValueFieldChoiceInterface<FiltersValueFieldPaymentMethod>
>;
