import { filtersDataChoicesGetVirtualViewing } from 'components/filters/data/choices/get-virtual-viewing';
import { IconThickPlayTemplate } from 'components/icon/thick/play-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ChipChoiceTemplate } from 'library/chip-choice/template';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetVirtualViewingsComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate label={t('virtual-viewings')} icon={<IconThickPlayTemplate class={styles.icon} />} isNew>
    <ChipChoiceTemplate
      placeholder={t('all-virtual-viewings')}
      containerClassName={styles.list}
      options={filtersDataChoicesGetVirtualViewing(filtersValue, filtersData)}
      selected={filtersValue[FiltersParametersEnum.virtualViewings]}
      onCheck={(selectedOption): void => {
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.virtualViewings]: selectedOption.value });
      }}
    />
  </FiltersModalItemTemplate>
);
