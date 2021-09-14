import { filtersDataChoicesGetMaxArea } from 'components/filters/data/choices/get-max-area';
import { filtersDataChoicesGetMinArea } from 'components/filters/data/choices/get-min-area';
import { IconThickFloorPlanTemplate } from 'components/icon/thick/floor-plan-template';
import { configCommon } from 'config/common';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';
import { SelectFieldTemplate } from 'library/select-field/template';

import { FiltersModalItemTemplate } from '../item/template';
import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

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
          true,
          filtersValue[FiltersParametersEnum.maxArea]
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
          false,
          filtersValue[FiltersParametersEnum.minArea]
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
