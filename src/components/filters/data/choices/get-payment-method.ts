import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPaymentMethodChoiceType } from 'components/filters/value/field/payment-method-choice.type';

export const filtersDataChoicesGetPaymentMethod =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPaymentMethodChoiceType>(FiltersParametersEnum.paymentMethod);
