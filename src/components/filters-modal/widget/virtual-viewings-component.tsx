import { filtersDataChoicesGetVirtualViewing } from 'components/filters/data/choices/get-virtual-viewing';

import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconThickPlayTemplate } from 'components/icon/thick/play-template';

import styles from './filters-modal-widget-component.module.scss';

export const FiltersModalWidgetVirtualViewingsComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('Virtual Viewings')} icon={<IconThickPlayTemplate class={styles.icon} />} isNew>
    <ChipChoiceTemplate
      containerClassName={styles.list}
      options={filtersDataChoicesGetVirtualViewing(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.virtualViewings]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.virtualViewings]: selectedOption.value });
      }}
    />
  </FiltersModalItemTemplate>
);
