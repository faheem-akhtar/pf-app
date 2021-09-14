import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersModalWidgetAmenitiesComponent } from './amenities-component';
import { FiltersModalWidgetAreaComponent } from './area-component';
import { FiltersModalWidgetBathroomComponent } from './bathroom-component';
import { FiltersModalWidgetBedroomComponent } from './bedroom-component';
import { FiltersModalWidgetCategoryIdComponent } from './category-id-component';
import { FiltersModalWidgetCompletionStatusComponent } from './completion-status-component';
import { FiltersModalWidgetFurnishingComponent } from './furnishing-component';
import { FiltersModalWidgetInstallmentYearsComponent } from './installment-years-component';
import { FiltersModalWidgetIsDeveloperPropertyComponent } from './is-developer-property-component';
import { FiltersModalWidgetKeywordsComponent } from './keywords-component';
import { FiltersModalWidgetPaymentMethodComponent } from './payment-method-component';
import { FiltersModalWidgetPriceComponent } from './price-component';
import { FiltersModalWidgetPricePeriodComponent } from './price-period-component';
import { FiltersModalWidgetPropertyTypeComponent } from './property-type-component';
import { FiltersModalWidgetType } from './type';
import { FiltersModalWidgetUtilitiesPriceTypeComponent } from './utilities-price-type-component';
import { FiltersModalWidgetVirtualViewingsComponent } from './virtual-viewings-component';

export const filtersModalWidgetRenderMap: Record<string, FiltersModalWidgetType> = {
  [FiltersParametersEnum.categoryId]: FiltersModalWidgetCategoryIdComponent,
  [FiltersParametersEnum.propertyTypeId]: FiltersModalWidgetPropertyTypeComponent,
  [FiltersParametersEnum.virtualViewings]: FiltersModalWidgetVirtualViewingsComponent,
  [FiltersParametersEnum.pricePeriod]: FiltersModalWidgetPricePeriodComponent,
  [FiltersParametersEnum.minPrice]: FiltersModalWidgetPriceComponent,
  [FiltersParametersEnum.paymentMethod]: FiltersModalWidgetPaymentMethodComponent,
  [FiltersParametersEnum.utilitiesPriceType]: FiltersModalWidgetUtilitiesPriceTypeComponent,
  [FiltersParametersEnum.maxBedroom]: FiltersModalWidgetBedroomComponent,
  [FiltersParametersEnum.maxBathroom]: FiltersModalWidgetBathroomComponent,
  [FiltersParametersEnum.isDeveloperProperty]: FiltersModalWidgetIsDeveloperPropertyComponent,
  [FiltersParametersEnum.minInstallmentYears]: FiltersModalWidgetInstallmentYearsComponent,
  [FiltersParametersEnum.minArea]: FiltersModalWidgetAreaComponent,
  [FiltersParametersEnum.completionStatus]: FiltersModalWidgetCompletionStatusComponent,
  [FiltersParametersEnum.amenities]: FiltersModalWidgetAmenitiesComponent,
  [FiltersParametersEnum.furnishing]: FiltersModalWidgetFurnishingComponent,
  [FiltersParametersEnum.keyword]: FiltersModalWidgetKeywordsComponent,
};
