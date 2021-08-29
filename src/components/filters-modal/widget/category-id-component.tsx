import { categoryIdIsCommercial } from 'helpers/category-id/is-commercial';
import { categoryIdToggleCommercial } from 'helpers/category-id/toggle-commercial';
import { filtersDataChoicesGetCategoryId } from 'components/filters/data/choices/get-category-id';

import { CheckboxTemplate } from 'library/checkbox/template';
import { FiltersModalItemTemplate } from '../item/template';
import { FiltersModalWidgetType } from './type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { SwitchTemplate } from 'library/switch/template';

export const FiltersModalWidgetCategoryIdComponent: FiltersModalWidgetType = ({
  filtersValue,
  filtersData,
  changeFiltersValue,
  t,
}) => (
  <FiltersModalItemTemplate>
    <>
      <SwitchTemplate
        options={filtersDataChoicesGetCategoryId(filtersValue, filtersData).filter((choice) => {
          const commercialPredicate = categoryIdIsCommercial(choice.value);

          return categoryIdIsCommercial(filtersValue[FiltersParametersEnum.categoryId])
            ? commercialPredicate
            : !commercialPredicate;
        })}
        selected={filtersValue[FiltersParametersEnum.categoryId]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.categoryId]: selectedOption.value });
        }}
      />
      <CheckboxTemplate
        id='commercial'
        checked={categoryIdIsCommercial(filtersValue[FiltersParametersEnum.categoryId])}
        onChange={(): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.categoryId]: categoryIdToggleCommercial(
              filtersValue[FiltersParametersEnum.categoryId]
            ),
          });
        }}
      >
        {t('filters-modal/commercial-only')}
      </CheckboxTemplate>
    </>
  </FiltersModalItemTemplate>
);
