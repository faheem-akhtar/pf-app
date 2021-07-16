import { useContext } from 'react';

import { DropdownTemplate } from 'components/dropdown/template';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertySearchCountAndSortSectionComponentPropsType } from './component-props.type';

import { filtersDataChoicesGetSort } from 'components/filters/data/choices/get-sort';

import styles from './property-search-count-and-sort-section.module.scss';

export const PropertySearchCountAndSortSectionComponent = ({
  count,
  loading,
}: PropertySearchCountAndSortSectionComponentPropsType): JSX.Element => {
  const filtersCtx = useContext(FiltersContext);
  const choices = filtersDataChoicesGetSort(filtersCtx.value, filtersCtx.data);

  return (
    <div className={styles.container}>
      <div>{loading ? '...' : count} properties sorted by</div>
      <DropdownTemplate
        title=''
        value={filtersCtx.value[FiltersParametersEnum.sort] || choices[0].value}
        choices={choices}
        onChange={(value): void => {
          filtersCtx.change((filtersValue) => ({ ...filtersValue, [FiltersParametersEnum.sort]: value }));
        }}
      />
    </div>
  );
};
