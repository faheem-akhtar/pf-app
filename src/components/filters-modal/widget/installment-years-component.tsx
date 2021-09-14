import { filtersDataChoicesGetInstallmentYears } from 'components/filters/data/choices/get-installment-years';
import { IconThickCalendarTemplate } from 'components/icon/thick/calendar-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';
import { SelectFieldTemplate } from 'library/select-field/template';

import { FiltersModalItemTemplate } from '../item/template';
import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';
import { filtersModalUpdateSelectedOptionLabel } from '../update-selected-option-label';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetInstallmentYearsComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => {
  const options = filtersDataChoicesGetInstallmentYears(filtersValue, filtersData);

  return (
    <FiltersModalItemTemplate
      label={t('filters-modal/years-of-installment-title')}
      icon={<IconThickCalendarTemplate class={styles.icon} />}
      visible={!!filtersValue[FiltersParametersEnum.isDeveloperProperty]}
      containerClassName={styles.installment_years}
    >
      <div className={styles.split}>
        <SelectFieldTemplate
          dropdownIcon
          label={t('from')}
          value={filtersValue[FiltersParametersEnum.minInstallmentYears]}
          options={filtersModalUpdateSelectedOptionLabel(
            filtersToRangeOptions(
              filtersModalMapSelectOptionsLabels(options, t('From'), true),
              true,
              filtersValue[FiltersParametersEnum.maxInstallmentYears]
            ),
            filtersValue[FiltersParametersEnum.minInstallmentYears]
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minInstallmentYears]: value });
          }}
        />
        <SelectFieldTemplate
          dropdownIcon
          label={t('to')}
          value={filtersValue[FiltersParametersEnum.maxInstallmentYears]}
          options={filtersModalUpdateSelectedOptionLabel(
            filtersToRangeOptions(
              filtersModalMapSelectOptionsLabels(options, t('To'), true),
              false,
              filtersValue[FiltersParametersEnum.minInstallmentYears]
            ),
            filtersValue[FiltersParametersEnum.maxInstallmentYears]
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxInstallmentYears]: value });
          }}
        />
      </div>
    </FiltersModalItemTemplate>
  );
};
