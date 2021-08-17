import { filtersDataChoicesGetUtilitiesPrice } from 'components/filters/data/choices/get-utilities-price';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickPriceInclusiveTemplate } from 'components/icon/thick/price-inclusive-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetUtilitiesPriceTypeComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate
    label={t('filters-modal/utilities-price-type-title')}
    icon={<IconThickPriceInclusiveTemplate class={styles.icon} />}
  >
    <ChipChoiceTemplate
      containerClassName={styles.list}
      placeholder={t('All')}
      options={filtersDataChoicesGetUtilitiesPrice(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.utilitiesPriceType]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.utilitiesPriceType]: selectedOption.value,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
