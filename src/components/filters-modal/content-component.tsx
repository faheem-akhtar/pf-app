/* eslint-disable react/display-name */

import { useContext } from 'react';

import { TFunction, useTranslation } from 'next-i18next';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { DropdownTemplate } from '../dropdown/template';
import { FiltersContext } from '../filters/context';
import { FiltersDataInterface } from '../filters/data/interface';
import { FiltersModalSubmitButtonComponent } from './submit-button-component';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueInterface } from '../filters/value/interface';
import { PropertySearchResultsCountForCurrentQueryContext } from 'views/property-search/results-count-for-current-query/context';

import { filtersDataChoicesGetCategoryId } from '../filters/data/choices/get-category-id';
import { filtersDataChoicesGetCompleteonStatus } from '../filters/data/choices/get-completeon-status';
import { filtersDataChoicesGetFurnished } from '../filters/data/choices/get-furnished';
import { filtersDataChoicesGetMaxArea } from '../filters/data/choices/get-max-area';
import { filtersDataChoicesGetMaxBathroom } from '../filters/data/choices/get-max-bathroom';
import { filtersDataChoicesGetMaxBedroom } from '../filters/data/choices/get-max-bedroom';
import { filtersDataChoicesGetMinArea } from '../filters/data/choices/get-min-area';
import { filtersDataChoicesGetMinBathroom } from '../filters/data/choices/get-min-bathroom';
import { filtersDataChoicesGetMinBedroom } from '../filters/data/choices/get-min-bedroom';
import { filtersDataChoicesGetPricePeriod } from '../filters/data/choices/get-price-period';
import { filtersDataChoicesGetPropertyTypeId } from '../filters/data/choices/get-property-type-id';
import { filtersDataChoicesGetVirtualViewing } from '../filters/data/choices/get-virtual-viewing';
import { filtersDataGetEnabledFilterTypes } from '../filters/data/get-enabled-filter-types';
import { filtersValueEquals } from 'components/filters/value/equals';
import { useFiltersDataChoicesPrice } from 'components/filters/data/choices/price.hook';
import { useFiltersValueState } from 'components/filters/value/state.hook';

import styles from './filters-modal-component.module.scss';

interface RenderWidgetPropsInterface {
  filtersValue: FiltersValueInterface;
  filtersData: FiltersDataInterface;
  changeFiltersValue: (value: FiltersValueInterface) => void;
  t: TFunction;
}

const widgetRenderMap: Record<string, (props: RenderWidgetPropsInterface) => JSX.Element> = {
  [FiltersParametersEnum.categoryId]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Category')}
      value={filtersValue[FiltersParametersEnum.categoryId]}
      choices={filtersDataChoicesGetCategoryId(filtersValue, filtersData)}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.categoryId]: value })}
    />
  ),
  [FiltersParametersEnum.propertyTypeId]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Property type')}
      value={filtersValue[FiltersParametersEnum.propertyTypeId]}
      choices={filtersDataChoicesGetPropertyTypeId(filtersValue, filtersData)}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.propertyTypeId]: value })}
    />
  ),
  [FiltersParametersEnum.minBedroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Min. Bedrooms')}
      value={filtersValue[FiltersParametersEnum.minBedroom]}
      choices={filtersDataChoicesGetMinBedroom(filtersValue, filtersData)}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minBedroom]: value })}
    />
  ),
  [FiltersParametersEnum.maxBedroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Max. Bedrooms')}
      choices={filtersDataChoicesGetMaxBedroom(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.maxBedroom]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxBedroom]: value })}
    />
  ),
  [FiltersParametersEnum.completionStatus]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Completeon status')}
      choices={filtersDataChoicesGetCompleteonStatus(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.completionStatus]}
      onChange={(value): void =>
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.completionStatus]: value })
      }
    />
  ),
  [FiltersParametersEnum.pricePeriod]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Price period')}
      choices={filtersDataChoicesGetPricePeriod(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.pricePeriod]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.pricePeriod]: value })}
    />
  ),
  [FiltersParametersEnum.minPrice]: ({ filtersValue, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Min. Price')}
      choices={useFiltersDataChoicesPrice(filtersValue)}
      value={filtersValue[FiltersParametersEnum.minPrice]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minPrice]: value })}
    />
  ),
  [FiltersParametersEnum.maxPrice]: ({ filtersValue, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Max. Price')}
      choices={useFiltersDataChoicesPrice(filtersValue)}
      value={filtersValue[FiltersParametersEnum.maxPrice]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxPrice]: value })}
    />
  ),
  [FiltersParametersEnum.paymentMethod]: () => <div>paymentMethod not implemented</div>,
  [FiltersParametersEnum.utilitiesPriceType]: () => <div>utilitiesPriceType not implemented</div>,
  [FiltersParametersEnum.furnishing]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Furnished')}
      choices={filtersDataChoicesGetFurnished(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.furnishing]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.furnishing]: value })}
    />
  ),
  [FiltersParametersEnum.minBathroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Min. Bathrooms')}
      choices={filtersDataChoicesGetMinBathroom(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.minBathroom]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minBathroom]: value })}
    />
  ),
  [FiltersParametersEnum.maxBathroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Max. Bathrooms')}
      choices={filtersDataChoicesGetMaxBathroom(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.maxBathroom]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxBathroom]: value })}
    />
  ),
  [FiltersParametersEnum.virtualViewings]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Virtual viewings')}
      choices={filtersDataChoicesGetVirtualViewing(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.virtualViewings]}
      onChange={(value): void =>
        changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.virtualViewings]: value })
      }
    />
  ),
  [FiltersParametersEnum.minArea]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Min. Area')}
      choices={filtersDataChoicesGetMinArea(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.minArea]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minArea]: value })}
    />
  ),
  [FiltersParametersEnum.maxArea]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <DropdownTemplate
      className={styles.dropdown}
      title={t('Max. Area')}
      choices={filtersDataChoicesGetMaxArea(filtersValue, filtersData)}
      value={filtersValue[FiltersParametersEnum.maxArea]}
      onChange={(value): void => changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxArea]: value })}
    />
  ),
  [FiltersParametersEnum.amenities]: () => <span />,
};

const filtersSequence = Object.keys(widgetRenderMap);

// TODO-FE[TPNX-3061] Replace this temporary modal implementation with a permanent one
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
    <div className={styles.containter}>
      <div className={styles.header}>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={close}
        >
          Close
        </ButtonTemplate>
        <span>Filters</span>
        <ButtonTemplate
          className={filtersValueIsDefault ? styles.hidden : ''}
          type='button'
          componentType={ButtonComponentTypeEnum.secondaryBlue}
          size={ButtonSizeEnum.small}
          onClick={resetFiltersValue}
        >
          Reset
        </ButtonTemplate>
      </div>
      <div className={styles.content}>
        {enabledFiltersInSequence.map((filterType) => {
          const Component = widgetRenderMap[filterType as keyof FiltersValueInterface];

          if (!Component) return;

          return (
            <Component
              key={filterType}
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
