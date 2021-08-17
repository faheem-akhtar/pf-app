import { filtersDataChoicesGetAmenities } from 'components/filters/data/choices/get-amenities';

import { ChipsFilterTemplate } from 'library/chips-filter/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickAmenitiesLuxuryTemplate } from 'components/icon/thick/amenities-luxury-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetAmenitiesComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('amenities')} icon={<IconThickAmenitiesLuxuryTemplate class={styles.icon} />}>
    <ChipsFilterTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetAmenities(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.amenities] || []}
      onCheck={(selectedOptions): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.amenities]: selectedOptions,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
