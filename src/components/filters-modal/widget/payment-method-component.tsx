import { filtersDataChoicesGetPaymentMethod } from 'components/filters/data/choices/get-payment-method';

import { CheckboxTemplate } from 'library/checkbox/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetPaymentMethodComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate containerClassName={styles.payment_method}>
    <CheckboxTemplate
      id='payment-method'
      checked={!!filtersValue[FiltersParametersEnum.paymentMethod]}
      onChange={(): void => {
        const choices = filtersDataChoicesGetPaymentMethod(filtersValue, filtersData);
        const otherChoice = choices.find((item) => item.value !== filtersValue[FiltersParametersEnum.paymentMethod]);

        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.paymentMethod]: otherChoice?.value,
        });
      }}
    >
      {t('filters:payment-method:choice_installments:label')}
    </CheckboxTemplate>
  </FiltersModalItemTemplate>
);
