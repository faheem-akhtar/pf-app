import { filtersDataChoicesGetPricePeriod } from 'components/filters/data/choices/get-price-period';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickPriceTemplate } from 'components/icon/thick/price-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetPricePeriodComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('Price period')} icon={<IconThickPriceTemplate class={styles.icon} />}>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetPricePeriod(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.pricePeriod]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.pricePeriod]: selectedOption.value });
      }}
    />
  </FiltersModalItemTemplate>
);
