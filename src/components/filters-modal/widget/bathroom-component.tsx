import { filtersDataChoicesGetMinBathroom } from 'components/filters/data/choices/get-min-bathroom';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBathroomType } from 'components/filters/value/field/max-bathroom.type';
import { IconThickBathroomTemplate } from 'components/icon/thick/bathroom-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetBathroomComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('Bathrooms')} icon={<IconThickBathroomTemplate class={styles.icon} />}>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetMinBathroom(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.minBathroom]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.minBathroom]: selectedOption.value,
          [FiltersParametersEnum.maxBathroom]: selectedOption.value as FiltersValueFieldMaxBathroomType,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
