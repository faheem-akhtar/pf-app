import { filtersDataChoicesGetPaymentMethod } from 'components/filters/data/choices/get-payment-method';
import { useFiltersDataChoicesPrice } from 'components/filters/data/choices/price.hook';
import { IconThickPriceTemplate } from 'components/icon/thick/price-template';
import { configCommon } from 'config/common';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';
import { SelectFieldTemplate } from 'library/select-field/template';

import { FiltersModalItemTemplate } from '../item/template';
import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetPriceComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => {
  const options = useFiltersDataChoicesPrice(filtersValue);

  return (
    <FiltersModalItemTemplate
      label={t('filters-modal/price-title', { currency: t(`currency-code/${configCommon.currencyCode}`) })}
      icon={<IconThickPriceTemplate class={styles.icon} />}
      hasBorder={!filtersDataChoicesGetPaymentMethod(filtersValue, filtersData).length}
    >
      <div className={styles.split}>
        <SelectFieldTemplate
          dropdownIcon
          label={t('from')}
          value={filtersValue[FiltersParametersEnum.minPrice]}
          options={filtersToRangeOptions(
            filtersModalMapSelectOptionsLabels(options, t('from')),
            true,
            filtersValue[FiltersParametersEnum.maxPrice]
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minPrice]: value });
          }}
        />
        <SelectFieldTemplate
          dropdownIcon
          label={t('to')}
          value={filtersValue[FiltersParametersEnum.maxPrice]}
          options={filtersToRangeOptions(
            filtersModalMapSelectOptionsLabels(options, t('to')),
            false,
            filtersValue[FiltersParametersEnum.minPrice]
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxPrice]: value });
          }}
        />
      </div>
    </FiltersModalItemTemplate>
  );
};
