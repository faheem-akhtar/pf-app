import { useContext, useRef } from 'react';

import { FiltersContext } from 'components/filters/context';
import { filtersDataChoicesGetSort } from 'components/filters/data/choices/get-sort';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { IconThickArrowDownTemplate } from 'components/icon/thick/arrow-down-template';
import { PropertyCardMenuContentButtonTemplate } from 'components/property-card/menu/content/button/template';
import { PropertyCardMenuModalComponent } from 'components/property-card/menu/modal/component';
import { onBoardingEnabledFeaturedTooltip } from 'config/on-boarding/enabled-featured-tooltip';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { domClassMerge } from 'helpers/dom/class-merge';
import { stringMakeBoldWord } from 'helpers/string/make-bold-word';
import { useTranslation } from 'helpers/translation/hook';
import { OnBoardingComponent } from 'library/on-boarding/component';
import { OnBoardingTypeEnum } from 'library/on-boarding/type.enum';

import { PropertySearchCountAndSortSectionComponentPropsType } from './component-props.type';
import styles from './property-search-count-and-sort-section.module.scss';

export const PropertySearchCountAndSortSectionComponent = ({
  count,
  loading,
}: PropertySearchCountAndSortSectionComponentPropsType): JSX.Element => {
  const { t } = useTranslation();
  const openFiltersRef = useRef<() => void>() as React.MutableRefObject<() => void>;
  const closeFiltersRef = useRef<() => void>() as React.MutableRefObject<() => void>;
  const filtersCtx = useContext(FiltersContext);
  const choices = filtersDataChoicesGetSort(filtersCtx.value, filtersCtx.data);
  const onChange = (value: FiltersValueFieldSortType): void => {
    filtersCtx.change((filtersValue) => ({ ...filtersValue, [FiltersParametersEnum.sort]: value }));
    closeFiltersRef.current();
  };
  const shouldRenderTooltip =
    onBoardingEnabledFeaturedTooltip && filtersCtx.value[FiltersParametersEnum.isDeveloperProperty];

  return (
    <div className={styles.container}>
      <span>{t('n-properties-sorted-by').replace('{n}', loading ? '...' : count.toString())} </span>
      <div className={styles.tooltipWrapper}>
        <button className={styles.sort_btn} onClick={(): void => openFiltersRef.current()}>
          <span>{choices.find((c) => c.value === filtersCtx.value[FiltersParametersEnum.sort])?.label}</span>
          <IconThickArrowDownTemplate class={styles.sort_icon} />
        </button>

        {shouldRenderTooltip && (
          <OnBoardingComponent
            name={OnBoardingTypeEnum.featuredTooltip}
            prerequisiteName={OnBoardingTypeEnum.filterTooltip}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t('on-boarding/featured-description').replace(
                  '{suffix}',
                  stringMakeBoldWord(t('on-boarding/featured-description-suffix'))
                ),
              }}
            />
          </OnBoardingComponent>
        )}
      </div>

      <PropertyCardMenuModalComponent
        closeButtonLabel={t('cta-cancel')}
        openRef={openFiltersRef}
        closeRef={closeFiltersRef}
      >
        {choices.map((sortChoice) => {
          return (
            <PropertyCardMenuContentButtonTemplate
              className={domClassMerge(styles.sort_choice, {
                [styles.sort_choice__active]: sortChoice.value === filtersCtx.value[FiltersParametersEnum.sort],
              })}
              key={sortChoice.value}
              label={sortChoice.label}
              onClick={(): void => {
                onChange(sortChoice.value);
              }}
              isNew={['da', 'dd'].includes(sortChoice.value)}
              tag={t('new')}
            />
          );
        })}
      </PropertyCardMenuModalComponent>
    </div>
  );
};
