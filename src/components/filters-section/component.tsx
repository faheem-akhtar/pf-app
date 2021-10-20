import { useRouter } from 'next/router';
import { useContext } from 'react';

import { FiltersContext } from 'components/filters/context';
import { FiltersModalButtonComponent } from 'components/filters-modal/button-component';
import { MultiLocationSelectorComponent } from 'components/multi-location-selector/component';
import { SaveSearchContextProvider } from 'components/save-search/context-provider';
import { SaveSearchModalButtonComponent } from 'components/save-search/modal/button-component';
import { WrapperTemplate } from 'components/wrapper/template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { domClassMerge } from 'helpers/dom/class-merge';
import { AppearOnScrollComponent } from 'library/appear-on-scroll/component';
import { LocationCompactInterface } from 'types/location/compact.interface';

import styles from './filters-section.module.scss';

const ButtonsRow = ({
  className,
  visibleTooltip = false,
}: {
  className?: string;
  visibleTooltip?: boolean;
}): JSX.Element => (
  <div className={domClassMerge(styles.buttons_row, className)}>
    <FiltersModalButtonComponent visibleTooltip={visibleTooltip} />
    <SaveSearchModalButtonComponent visibleTooltip={visibleTooltip} />
  </div>
);

export const FiltersSectionComponent = (): JSX.Element => {
  const router = useRouter();
  const filtersCtx = useContext(FiltersContext);

  return (
    <WrapperTemplate className={styles.container}>
      <MultiLocationSelectorComponent
        className={styles.searchbar}
        locale={(router.locale || LanguageCodeEnum.en) as LanguageCodeEnum}
        value={filtersCtx.value[FiltersParametersEnum.locationsIds]}
        onChange={(locations: LocationCompactInterface[]): void => {
          filtersCtx.change((filtersValue) => {
            return {
              ...filtersValue,
              [FiltersParametersEnum.locationsIds]: locations,
            };
          });
        }}
      />
      <SaveSearchContextProvider>
        <ButtonsRow visibleTooltip />
        <AppearOnScrollComponent showOnlyOnScrollUp>
          <WrapperTemplate className={styles.buttons_row__appear_on_scroll}>
            <ButtonsRow />
          </WrapperTemplate>
        </AppearOnScrollComponent>
      </SaveSearchContextProvider>
    </WrapperTemplate>
  );
};
