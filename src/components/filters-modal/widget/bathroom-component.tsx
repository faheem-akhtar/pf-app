import { filtersDataChoicesGetBathrooms } from 'components/filters/data/choices/get-bathrooms';
import { IconThickBathroomTemplate } from 'components/icon/thick/bathroom-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipsFilterTemplate } from 'library/chips-filter/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetBathroomComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('bathrooms')} icon={<IconThickBathroomTemplate class={styles.icon} />}>
    <ChipsFilterTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetBathrooms(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.bathrooms] || []}
      onCheck={(selectedOptions): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.bathrooms]: selectedOptions,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
