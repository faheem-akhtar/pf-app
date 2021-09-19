import { useContext, useRef } from 'react';

import { FiltersContext } from 'components/filters/context';
import { IconThinFilterOpenTemplate } from 'components/icon/thin/filter-open-template';
import { ModalComponent } from 'components/modal/component';
import { onBoardingEnabledFilterTooltip } from 'config/on-boarding/enabled-filter-tooltip';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { filtersCountGetActiveFields } from 'helpers/filters/count/get-active-fields';
import { stringMakeBoldWord } from 'helpers/string/make-bold-word';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { OnBoardingComponent } from 'library/on-boarding/component';
import { OnBoardingTypeEnum } from 'library/on-boarding/type.enum';

import { FiltersModalContentComponent } from './content-component';
import styles from './filters-modal-component.module.scss';

// TODO-FE[CX-423] add tests
export const FiltersModalButtonComponent = ({ visibleTooltip }: { visibleTooltip: boolean }): JSX.Element => {
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const { t } = useTranslation();
  const filtersCtx = useContext(FiltersContext);
  const nonDefaultFiltersCount = filtersCountGetActiveFields(filtersCtx);
  const shouldRenderTooltip =
    onBoardingEnabledFilterTooltip && filtersCtx.value[FiltersParametersEnum.isDeveloperProperty] && visibleTooltip;

  return (
    <>
      <div className={styles.tooltipWrapper}>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => openFiltersRef.current()}
          className={styles.filter_button}
          icon={{ component: IconThinFilterOpenTemplate, position: ButtonIconPositionEnum.left }}
        >
          {t('filters')} <span>{nonDefaultFiltersCount ? `(${nonDefaultFiltersCount})` : ''}</span>
        </ButtonTemplate>

        {shouldRenderTooltip && (
          <OnBoardingComponent
            name={OnBoardingTypeEnum.filterTooltip}
            prerequisiteName={OnBoardingTypeEnum.saveSearchTooltip}
            className={styles.tooltip}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t('on-boarding/filter-description').replace(
                  '{name}',
                  stringMakeBoldWord(t('filters-modal/is-developer-property-title'))
                ),
              }}
            />
          </OnBoardingComponent>
        )}
      </div>

      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        <FiltersModalContentComponent close={(): void => closeFiltersRef.current()} />
      </ModalComponent>
    </>
  );
};
