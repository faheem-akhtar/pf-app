import { filtersDataChoicesGetAmenities } from 'components/filters/data/choices/get-amenities';
import { IconThickAmenitiesLuxuryTemplate } from 'components/icon/thick/amenities-luxury-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipsFilterTemplate } from 'library/chips-filter/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

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
