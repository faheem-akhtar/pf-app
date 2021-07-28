import { useContext } from 'react';
import { useRouter } from 'next/router';

import { FiltersContext } from 'components/filters/context';
import { FiltersModalButtonComponent } from 'components/filters-modal/button-component';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'components/location/compact.interface';
import { MultiLocationSelectorComponent } from 'components/multi-location-selector/component';

import styles from './filters-section.module.scss';

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
      <div className={styles.buttons_row}>
        <FiltersModalButtonComponent />
      </div>
    </div>
  );
};
