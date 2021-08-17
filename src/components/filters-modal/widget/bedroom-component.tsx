import { filtersDataChoicesGetMinBedroom } from 'components/filters/data/choices/get-min-bedroom';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBedroomType } from 'components/filters/value/field/max-bedroom.type';
import { IconThickBedroomTemplate } from 'components/icon/thick/bedroom-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetBedroomComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('bedrooms')} icon={<IconThickBedroomTemplate class={styles.icon} />}>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetMinBedroom(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.minBedroom]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.minBedroom]: selectedOption.value,
          [FiltersParametersEnum.maxBedroom]: selectedOption.value as FiltersValueFieldMaxBedroomType,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
