import { IconThickMagnifierTemplate } from 'components/icon/thick/magnifier-template';
import { KeywordsComponent } from 'components/keywords/component';
import { keywordsByCategory } from 'config/keywords/by-category';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersModalItemTemplate } from '../item/template';
import styles from './filters-modal-widget-component.module.scss';
import { FiltersModalWidgetType } from './type';

export const FiltersModalWidgetKeywordsComponent: FiltersModalWidgetType = ({
  t,
  filtersValue,
  changeFiltersValue,
}) => {
  return (
    <FiltersModalItemTemplate
      label={t('search/filters/keywords_title')}
      icon={<IconThickMagnifierTemplate class={styles.icon} />}
    >
      <KeywordsComponent
        chipsOnTheBottom
        keywordsMapping={keywordsByCategory}
        className={styles.keywords}
        chipClassName={styles.keywords_chip}
        category={filtersValue[FiltersParametersEnum.categoryId]}
        value={filtersValue[FiltersParametersEnum.keyword]}
        onChange={(keywords): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.keyword]: keywords,
          });
        }}
      />
    </FiltersModalItemTemplate>
  );
};
