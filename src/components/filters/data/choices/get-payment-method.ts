import { FiltersValueFieldPaymentMethodChoiceType } from 'components/filters/value/field/payment-method-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetPaymentMethod =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPaymentMethodChoiceType>(FiltersParametersEnum.paymentMethod);
