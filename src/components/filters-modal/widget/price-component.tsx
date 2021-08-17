import { configCommon } from 'config/common';
import { filtersDataChoicesGetPaymentMethod } from 'components/filters/data/choices/get-payment-method';
import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';
import { useFiltersDataChoicesPrice } from 'components/filters/data/choices/price.hook';

import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickPriceTemplate } from 'components/icon/thick/price-template';
import { SelectFieldTemplate } from 'library/select-field/template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetPriceComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => {
  const options = useFiltersDataChoicesPrice(filtersValue);

  return (
    <FiltersModalItemTemplate
      label={t('Price ({currency})').replace('{currency}', t(configCommon.currencyCode))}
      icon={<IconThickPriceTemplate class={styles.icon} />}
      hasBorder={!filtersDataChoicesGetPaymentMethod(filtersValue, filtersData).length}
    >
      <div className={styles.split}>
        <SelectFieldTemplate
          dropdownIcon
          label={t('From')}
          value={filtersValue[FiltersParametersEnum.minPrice]}
          options={filtersToRangeOptions(
            filtersModalMapSelectOptionsLabels(options, t('From')),
            filtersValue[FiltersParametersEnum.maxPrice],
            true
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minPrice]: value });
          }}
        />
        <SelectFieldTemplate
          dropdownIcon
          label={t('To')}
          value={filtersValue[FiltersParametersEnum.maxPrice]}
          options={filtersToRangeOptions(
            filtersModalMapSelectOptionsLabels(options, t('To')),
            filtersValue[FiltersParametersEnum.minPrice],
            false
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxPrice]: value });
          }}
        />
      </div>
    </FiltersModalItemTemplate>
  );
};