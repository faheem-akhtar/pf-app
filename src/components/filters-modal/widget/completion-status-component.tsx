import { filtersDataChoicesGetCompleteonStatus } from 'components/filters/data/choices/get-completeon-status';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickBuildingCompletionTemplate } from 'components/icon/thick/building-completion-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetCompletionStatusComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate
    label={t('Completeon status')}
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
