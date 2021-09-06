import { useContext } from 'react';
import { useRouter } from 'next/router';

import { domClassMerge } from 'helpers/dom/class-merge';

import { AppearOnScrollComponent } from 'library/appear-on-scroll/component';
import { FiltersContext } from 'components/filters/context';
import { FiltersModalButtonComponent } from 'components/filters-modal/button-component';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';
import { MultiLocationSelectorComponent } from 'components/multi-location-selector/component';
import { SaveSearchContextProvider } from 'components/save-search/context-provider';
import { SaveSearchModalButtonComponent } from 'components/save-search/modal/button-component';

import styles from './filters-section.module.scss';

const ButtonsRow = ({ className }: { className?: string }): JSX.Element => (
  <div className={domClassMerge(styles.buttons_row, className)}>
    <FiltersModalButtonComponent />
    <SaveSearchModalButtonComponent />
  </div>
);

// TODO-FE[CX-423] add tests
export const FiltersSectionComponent = (): JSX.Element => {
  const router = useRouter();
  const filtersCtx = useContext(FiltersContext);

  return (
    <div className={styles.container}>
      <MultiLocationSelectorComponent
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
        <ButtonsRow />
      </SaveSearchContextProvider>
      <AppearOnScrollComponent>
        <ButtonsRow className={styles.buttons_row__appear_on_scroll} />
      </AppearOnScrollComponent>
    </div>
  );
};
