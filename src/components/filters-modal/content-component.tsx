/* eslint-disable react/display-name */

import { useContext } from 'react';

import { TFunction, useTranslation } from 'next-i18next';

import { configCommon } from 'config/common';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { CheckboxTemplate } from 'library/checkbox/template';
import { ChipChoiceTemplate } from 'library/chip-choice/template';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersContext } from '../filters/context';
import { FiltersDataInterface } from '../filters/data/interface';
import { FiltersModalItemTemplate } from 'components/filters-modal/item/template';
import { FiltersModalSubmitButtonComponent } from './submit-button-component';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldMaxBathroomType } from 'components/filters/value/field/max-bathroom.type';
import { FiltersValueFieldMaxBedroomType } from 'components/filters/value/field/max-bedroom.type';
import { FiltersValueInterface } from '../filters/value/interface';
import { PropertySearchResultsCountForCurrentQueryContext } from 'views/property-search/results-count-for-current-query/context';
import { SelectFieldTemplate } from 'library/select-field/template';
import { SwitchTemplate } from 'library/switch/template';

import { IconCloseTemplate } from 'components/icon/close-template';
import { IconThickBathroomTemplate } from 'components/icon/thick-bathroom-template';
import { IconThickBedroomTemplate } from 'components/icon/thick-bedroom-template';
import { IconThickBuildingCompletionTemplate } from 'components/icon/thick-building-completion-template';
import { IconThickFloorPlanTemplate } from 'components/icon/thick-floor-plan-template';
import { IconThickFurnishingTemplate } from 'components/icon/thick-furnishing-template';
import { IconThickPlayCircleTemplate } from 'components/icon/thick-play-circle-template';
import { IconThickPriceTemplate } from 'components/icon/thick-price-template';
import { IconThickPropertyTemplate } from 'components/icon/thick-property-template';

import { categoryIdIsCommercial } from 'helpers/category-id/is-commercial';
import { filtersDataChoicesGetCategoryId } from '../filters/data/choices/get-category-id';
import { filtersDataChoicesGetCompleteonStatus } from '../filters/data/choices/get-completeon-status';
import { filtersDataChoicesGetFurnished } from '../filters/data/choices/get-furnished';
import { filtersDataChoicesGetMaxArea } from '../filters/data/choices/get-max-area';
import { filtersDataChoicesGetMinArea } from '../filters/data/choices/get-min-area';
import { filtersDataChoicesGetMinBathroom } from '../filters/data/choices/get-min-bathroom';
import { filtersDataChoicesGetMinBedroom } from '../filters/data/choices/get-min-bedroom';
import { filtersDataChoicesGetPricePeriod } from '../filters/data/choices/get-price-period';
import { filtersDataChoicesGetPropertyTypeId } from '../filters/data/choices/get-property-type-id';
import { filtersDataChoicesGetVirtualViewing } from '../filters/data/choices/get-virtual-viewing';
import { filtersDataGetEnabledFilterTypes } from '../filters/data/get-enabled-filter-types';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';
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
          onCheck={(selectedOption): void =>
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.categoryId]: selectedOption.value })
          }
        />
        <CheckboxTemplate
          id='commercial'
          checked={categoryIdIsCommercial(filtersValue[FiltersParametersEnum.categoryId])}
          onChange={(e): void => {
            const toggleCommercial: FiltersValueFieldCategoryIdType = (e.target as HTMLInputElement).checked
              ? FiltersCategoryIdEnum.commercialForRent
              : FiltersCategoryIdEnum.residentialForRent;

            changeFiltersValue({
              ...filtersValue,
              [FiltersParametersEnum.categoryId]: toggleCommercial,
            });
          }}
        >
          {t('View commercial properties only')}
        </CheckboxTemplate>
      </>
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.propertyTypeId]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate label={t('Property type')} icon={<IconThickPropertyTemplate class={styles.icon} />}>
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetPropertyTypeId(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.propertyTypeId]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.propertyTypeId]: selectedOption.value });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.virtualViewings]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate
      label={t('Virtual Viewings')}
      icon={<IconThickPlayCircleTemplate class={styles.icon} />}
      isNew
    >
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetVirtualViewing(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.virtualViewings]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.virtualViewings]: selectedOption.value });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.pricePeriod]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate label={t('Price period')} icon={<IconThickPriceTemplate class={styles.icon} />}>
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetPricePeriod(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.pricePeriod]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.pricePeriod]: selectedOption.value });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.minPrice]: ({ filtersValue, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate
      label={t('Price ({currency})').replace('{currency}', t(configCommon.currencyCode))}
      icon={<IconThickPriceTemplate class={styles.icon} />}
    >
      <div className={styles.split}>
        <SelectFieldTemplate
          dropdownIcon
          label={t('From')}
          value={filtersValue[FiltersParametersEnum.minPrice]}
          options={filtersToRangeOptions(
            useFiltersDataChoicesPrice(filtersValue),
            filtersValue[FiltersParametersEnum.maxPrice],
            true
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.minPrice]: value });
          }}
        />
        <SelectFieldTemplate
          dropdownIcon
          label={t('To')}
          value={filtersValue[FiltersParametersEnum.maxPrice]}
          options={filtersToRangeOptions(
            useFiltersDataChoicesPrice(filtersValue),
            filtersValue[FiltersParametersEnum.minPrice],
            false
          )}
          onChange={(value): void => {
            changeFiltersValue({ ...filtersValue, [FiltersParametersEnum.maxPrice]: value });
          }}
        />
      </div>
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.maxBedroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate label={t('Bedrooms')} icon={<IconThickBedroomTemplate class={styles.icon} />}>
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetMinBedroom(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.minBedroom]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.minBedroom]: selectedOption.value,
            [FiltersParametersEnum.maxBedroom]: selectedOption.value as FiltersValueFieldMaxBedroomType,
          });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.maxBathroom]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate label={t('Bathrooms')} icon={<IconThickBathroomTemplate class={styles.icon} />}>
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetMinBathroom(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.minBathroom]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.minBathroom]: selectedOption.value,
            [FiltersParametersEnum.maxBathroom]: selectedOption.value as FiltersValueFieldMaxBathroomType,
          });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.minArea]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate
      label={t('Property Size ({area_unit})').replace('{area_unit}', t(configCommon.areaUnit))}
      icon={<IconThickFloorPlanTemplate class={styles.icon} />}
    >
      <div className={styles.split}>
        <SelectFieldTemplate
          dropdownIcon
          label={t('From')}
          value={filtersValue[FiltersParametersEnum.minArea]}
          options={filtersToRangeOptions(
            filtersDataChoicesGetMinArea(filtersValue, filtersData),
            filtersValue[FiltersParametersEnum.maxArea],
            true
          )}
          onChange={(value): void => {
            changeFiltersValue({
              ...filtersValue,
              [FiltersParametersEnum.minArea]: value,
            });
          }}
        />
        <SelectFieldTemplate
          dropdownIcon
          label={t('To')}
          value={filtersValue[FiltersParametersEnum.maxArea]}
          options={filtersToRangeOptions(
            filtersDataChoicesGetMaxArea(filtersValue, filtersData),
            filtersValue[FiltersParametersEnum.minArea],
            false
          )}
          onChange={(value): void => {
            changeFiltersValue({
              ...filtersValue,
              [FiltersParametersEnum.maxArea]: value,
            });
          }}
        />
      </div>
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.completionStatus]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate
      label={t('Completeon status')}
      icon={<IconThickBuildingCompletionTemplate class={styles.icon} />}
    >
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetCompleteonStatus(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.completionStatus]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.completionStatus]: selectedOption.value,
          });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.amenities]: () => <span />,
  [FiltersParametersEnum.furnishing]: ({ filtersValue, filtersData, changeFiltersValue, t }) => (
    <FiltersModalItemTemplate label={t('Furnishing')} icon={<IconThickFurnishingTemplate class={styles.icon} />}>
      <ChipChoiceTemplate
        containerClassName={styles.list}
        options={filtersDataChoicesGetFurnished(filtersValue, filtersData)}
        selected={filtersValue[FiltersParametersEnum.furnishing]}
        onCheck={(selectedOption): void => {
          changeFiltersValue({
            ...filtersValue,
            [FiltersParametersEnum.furnishing]: selectedOption.value,
          });
        }}
      />
    </FiltersModalItemTemplate>
  ),
  [FiltersParametersEnum.paymentMethod]: () => <div>paymentMethod not implemented</div>,
  [FiltersParametersEnum.utilitiesPriceType]: () => <div>utilitiesPriceType not implemented</div>,
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
        <div onClick={close} className={styles.headerLeft}>
          <IconCloseTemplate class={styles.closeIcon} />
          <span className={styles.title}>{t('Filters')}</span>
        </div>
        <ButtonTemplate
          className={filtersValueIsDefault ? styles.hidden : ''}
          type='button'
          componentType={ButtonComponentTypeEnum.secondary}
          size={ButtonSizeEnum.small}
          onClick={resetFiltersValue}
        >
          {t('Clear All')}
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
