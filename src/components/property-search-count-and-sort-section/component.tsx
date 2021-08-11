import { useContext, useRef } from 'react';

import { filtersDataChoicesGetSort } from 'components/filters/data/choices/get-sort';

import { DropdownTemplate } from 'components/dropdown/template';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { IconThickArrowDownTemplate } from 'components/icon/thick/arrow-down-template';
import { ModalComponent } from 'components/modal/component';
import { PropertySearchCountAndSortSectionComponentPropsType } from './component-props.type';

import styles from './property-search-count-and-sort-section.module.scss';

export const PropertySearchCountAndSortSectionComponent = ({
  count,
  loading,
}: PropertySearchCountAndSortSectionComponentPropsType): JSX.Element => {
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const filtersCtx = useContext(FiltersContext);
  const choices = filtersDataChoicesGetSort(filtersCtx.value, filtersCtx.data);
  const onChange = (value: FiltersValueFieldSortType): void => {
    filtersCtx.change((filtersValue) => ({ ...filtersValue, [FiltersParametersEnum.sort]: value }));
    closeFiltersRef.current();
  };

  return (
    <div className={styles.container}>
      {/* TODO-FE[TPNX-3154] search count and sort section add translations */}
      <span>{loading ? '...' : count} properties sorted by </span>
      <button class={styles.sort_btn} onClick={(): void => openFiltersRef.current()}>
        <span>{choices.find((c) => c.value === filtersCtx.value[FiltersParametersEnum.sort])?.label}</span>
        <IconThickArrowDownTemplate class={styles.sort_icon} />
      </button>

      {/* TODO-FE[TPNX-3155] Implement modal */}
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        <DropdownTemplate
          title=''
          value={filtersCtx.value[FiltersParametersEnum.sort] || choices[0].value}
          choices={choices}
          onChange={onChange}
        />
      </ModalComponent>
    </div>
  );
};
