import { filtersDataChoicesGetUtilitiesPrice } from 'components/filters/data/choices/get-utilities-price';
import { IconThickPriceInclusiveTemplate } from 'components/icon/thick/price-inclusive-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipChoiceTemplate } from 'library/chip-choice/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetUtilitiesPriceTypeComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => {
  const options = filtersDataChoicesGetUtilitiesPrice(filtersValue, filtersData).map((option) => ({
    ...option,
    label: t(option.label),
  }));

  return (
    <FiltersModalItemTemplate
      label={t('filters-modal/utilities-price-type-title')}
      icon={<IconThickPriceInclusiveTemplate class={styles.icon} />}
    >
      <ChipChoiceTemplate
        containerClassName={styles.list}
        placeholder={t('all')}
        options={options}
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
};
