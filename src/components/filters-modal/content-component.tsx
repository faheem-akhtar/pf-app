/* eslint-disable react/display-name */

import { useContext } from 'react';

import { filtersValueEquals } from 'components/filters/value/equals';
import { useFiltersValueState } from 'components/filters/value/state.hook';
import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { PropertySearchResultsCountForCurrentQueryContext } from 'views/property-search/results-count-for-current-query/context';

import { FiltersContext } from '../filters/context';
import { filtersDataGetEnabledFilterTypes } from '../filters/data/get-enabled-filter-types';
import { FiltersValueInterface } from '../filters/value/interface';
import styles from './filters-modal-component.module.scss';
import { FiltersModalSubmitButtonComponent } from './submit-button-component';
import { filtersModalWidgetRenderMap } from './widget/render-map';

const filtersSequence = Object.keys(filtersModalWidgetRenderMap);

// TODO-FE[CX-423] add tests
export const FiltersModalContentComponent = ({ close }: { close: () => void }): JSX.Element => {
  const resultsCountForCurrentQuery = useContext(PropertySearchResultsCountForCurrentQueryContext);
  const filtersCtx = useContext(FiltersContext);
  const { filtersValue, changeFiltersValue, resetFiltersValue, filtersValueIsDefault } = useFiltersValueState(
    filtersCtx.data,
    filtersCtx.value
  );

  const enabledFiltersMap = filtersDataGetEnabledFilterTypes(filtersValue, filtersCtx.data);
  const enabledFiltersInSequence = filtersSequence.filter((k) => enabledFiltersMap[k as keyof FiltersValueInterface]);

  const filtersHasNotBeenChanged = filtersValueEquals(filtersValue, filtersCtx.value);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={close} className={styles.headerLeft}>
          <IconThickCloseTemplate class={styles.closeIcon} />
          <h1 className={styles.title}>{t('filters')}</h1>
        </div>
        <ButtonTemplate
          className={filtersValueIsDefault ? styles.hidden : ''}
          type='button'
          componentType={ButtonComponentTypeEnum.secondary}
          size={ButtonSizeEnum.small}
          onClick={resetFiltersValue}
        >
          {t('clear-all')}
        </ButtonTemplate>
      </div>
      <div className={styles.content}>
        {enabledFiltersInSequence.map((filterType, i) => {
          const Component = filtersModalWidgetRenderMap[filterType as keyof FiltersValueInterface];

          if (!Component) return;

          return (
            <Component
              key={i}
              filtersValue={filtersValue}
              filtersData={filtersCtx.data}
              changeFiltersValue={changeFiltersValue}
              t={t}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        <FiltersModalSubmitButtonComponent
          forceNumberOfProperties={filtersHasNotBeenChanged ? resultsCountForCurrentQuery : null}
          filtersValue={filtersValue}
          onSubmit={(): void => {
            close();
            filtersCtx.set(filtersValue);
          }}
        />
      </div>
    </div>
  );
};
