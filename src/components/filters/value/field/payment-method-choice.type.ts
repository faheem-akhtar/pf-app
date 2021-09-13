import { OpaqueType } from 'types/opaque/type';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldPaymentMethodType } from './payment-method.type';

export type FiltersValueFieldPaymentMethodChoiceType = OpaqueType<
  'FiltersValueFieldPaymentMethodType',
  FiltersValueFieldChoiceInterface<FiltersValueFieldPaymentMethodType>
>;
