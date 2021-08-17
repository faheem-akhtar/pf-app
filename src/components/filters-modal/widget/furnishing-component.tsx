import { filtersDataChoicesGetFurnished } from 'components/filters/data/choices/get-furnished';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickFurnishingTemplate } from 'components/icon/thick/furnishing-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetFurnishingComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('furnishing')} icon={<IconThickFurnishingTemplate class={styles.icon} />}>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetFurnished(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.furnishing]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.furnishing]: selectedOption.value,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
