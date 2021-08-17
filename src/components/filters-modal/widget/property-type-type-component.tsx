import { filtersDataChoicesGetPropertyTypeId } from 'components/filters/data/choices/get-property-type-id';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickPropertyTemplate } from 'components/icon/thick/property-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetPropertyTypeTypeComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('property-type')} icon={<IconThickPropertyTemplate class={styles.icon} />}>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetPropertyTypeId(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.propertyTypeId]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.propertyTypeId]: selectedOption.value });
      }}
    />
  </FiltersModalItemTemplate>
);
