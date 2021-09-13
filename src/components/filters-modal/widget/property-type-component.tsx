import { filtersDataChoicesGetPropertyTypeId } from 'components/filters/data/choices/get-property-type-id';
import { IconThickPropertyTemplate } from 'components/icon/thick/property-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipChoiceTemplate } from 'library/chip-choice/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetPropertyTypeComponent: FiltersModalWidgetType = ({
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
