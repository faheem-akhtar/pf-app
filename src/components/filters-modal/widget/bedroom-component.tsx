import { filtersDataChoicesGetBedrooms } from 'components/filters/data/choices/get-bedrooms';
import { IconThickBedroomTemplate } from 'components/icon/thick/bedroom-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipsFilterTemplate } from 'library/chips-filter/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetBedroomComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('bedrooms')} icon={<IconThickBedroomTemplate class={styles.icon} />}>
    <ChipsFilterTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetBedrooms(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.bedrooms] || []}
      onCheck={(selectedOptions): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.bedrooms]: selectedOptions,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
