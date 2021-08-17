import { configCommon } from 'config/common';
import { filtersDataChoicesGetMaxArea } from 'components/filters/data/choices/get-max-area';
import { filtersDataChoicesGetMinArea } from 'components/filters/data/choices/get-min-area';
import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';

import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickFloorPlanTemplate } from 'components/icon/thick/floor-plan-template';
import { SelectFieldTemplate } from 'library/select-field/template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetAreaComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate
    label={t('filters-modal/property-size-title').replace('{area_unit}', t(`area-unit/${configCommon.areaUnit}`))}
    icon={<IconThickFloorPlanTemplate class={styles.icon} />}
  >
    <div className={styles.split}>
      <SelectFieldTemplate
        dropdownIcon
        label={t('from')}
        value={filtersValue[FiltersParametersEnum.minArea]}
        options={filtersToRangeOptions(
          filtersModalMapSelectOptionsLabels(filtersDataChoicesGetMinArea(filtersValue, filtersData), t('from')),
          filtersValue[FiltersParametersEnum.maxArea],
          true
        )}
        onChange={(value): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.minArea]: value,
          });
        }}
      />
      <SelectFieldTemplate
        dropdownIcon
        label={t('to')}
        value={filtersValue[FiltersParametersEnum.maxArea]}
        options={filtersToRangeOptions(
          filtersModalMapSelectOptionsLabels(filtersDataChoicesGetMaxArea(filtersValue, filtersData), t('to')),
          filtersValue[FiltersParametersEnum.minArea],
          false
        )}
        onChange={(value): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.maxArea]: value,
          });
        }}
      />
    </div>
  </FiltersModalItemTemplate>
);
