import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { IconThickDeveloperPropertyTemplate } from 'components/icon/thick/developer-property-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { CheckboxTemplate } from 'library/checkbox/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetIsDeveloperPropertyComponent: FiltersModalWidgetType = ({
  filtersValue,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate
    label={t('filters-modal/is-developer-property-title')}
    icon={<IconThickDeveloperPropertyTemplate class={styles.icon} />}
    isNew
    hasBorder={!filtersValue[FiltersParametersEnum.isDeveloperProperty]}
  >
    <CheckboxTemplate
      id='developer-property'
      checked={!!filtersValue[FiltersParametersEnum.isDeveloperProperty]}
      onChange={(e): void => {
        const toggleIsDeveloperProperty = !!(e.target as HTMLInputElement).checked;

        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.sort]: (toggleIsDeveloperProperty ? 'da' : 'mr') as FiltersValueFieldSortType,
          [FiltersParametersEnum.isDeveloperProperty]: toggleIsDeveloperProperty,
          [FiltersParametersEnum.minInstallmentYears]: null,
          [FiltersParametersEnum.maxInstallmentYears]: null,
        });
      }}
    >
      {t('filters-modal/is-developer-property-checkbox-label')}
    </CheckboxTemplate>
  </FiltersModalItemTemplate>
);
