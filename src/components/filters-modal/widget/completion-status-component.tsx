import { filtersDataChoicesGetCompleteonStatus } from 'components/filters/data/choices/get-completeon-status';
import { IconThickBuildingCompletionTemplate } from 'components/icon/thick/building-completion-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipChoiceTemplate } from 'library/chip-choice/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetCompletionStatusComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate
    label={t('completion-status')}
    icon={<IconThickBuildingCompletionTemplate class={styles.icon} />}
  >
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetCompleteonStatus(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.completionStatus]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({
          ...filtersValue,
          [FiltersParametersEnum.completionStatus]: selectedOption.value,
        });
      }}
    />
  </FiltersModalItemTemplate>
);
