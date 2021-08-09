import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from './base-interface';
import { FiltersValueFieldAmenitiesType } from './field/amenities.type';
import { FiltersValueFieldCompletionStatusType } from './field/completion-status.type';
import { FiltersValueFieldFurnishedType } from './field/furnished.type';
import { FiltersValueFieldMaxBathroomType } from './field/max-bathroom.type';
import { FiltersValueFieldMaxBedroomType } from './field/max-bedroom.type';
import { FiltersValueFieldMinBathroomType } from './field/min-bathroom.type';
import { FiltersValueFieldMinBedroomType } from './field/min-bedroom.type';
import { FiltersValueFieldPaymentMethodType } from './field/payment-method.type';
import { FiltersValueFieldPricePeriodType } from './field/price-period.type';
import { FiltersValueFieldSortType } from './field/sort.type';
import { FiltersValueFieldUtilitiesPriceTypeType } from './field/utilities-price-type.type';
import { FiltersValueFieldVirtualViewingType } from './field/virtual-viewing.type';
import { LocationCompactInterface } from 'types/location/compact.interface';

export interface FiltersValueInterface extends FiltersValueBaseInterface {
  /**
   * Location ids
   */
  [FiltersParametersEnum.locationsIds]: LocationCompactInterface[];

  /**
   * Min price
   */
  [FiltersParametersEnum.minPrice]: number | null;

  /**
   * Max price
   */
  [FiltersParametersEnum.maxPrice]: number | null;

  /**
   * Area (Min)
   */
  [FiltersParametersEnum.minArea]: number | null;

  /**
   * Area (Max)
   */
  [FiltersParametersEnum.maxArea]: number | null;

  /**
   * Keywords
   */
  [FiltersParametersEnum.keyword]: string;

  /**
   * Amenities
   */
  [FiltersParametersEnum.amenities]?: FiltersValueFieldAmenitiesType[];

  /**
   * Completion status
   */
  [FiltersParametersEnum.completionStatus]?: FiltersValueFieldCompletionStatusType | '';

  /**
   * Payment method
   */
  [FiltersParametersEnum.paymentMethod]?: FiltersValueFieldPaymentMethodType | '';

  /**
   * Price inclusive/exclusive
   */
  [FiltersParametersEnum.utilitiesPriceType]?: FiltersValueFieldUtilitiesPriceTypeType | '';

  /**
   * Virtual viewings
   */
  [FiltersParametersEnum.virtualViewings]?: FiltersValueFieldVirtualViewingType | '';

  /**
   * Price period
   */
  [FiltersParametersEnum.pricePeriod]?: FiltersValueFieldPricePeriodType;

  /**
   * Min beds
   */
  [FiltersParametersEnum.minBedroom]?: FiltersValueFieldMinBedroomType | '';

  /**
   * Max beds
   */
  [FiltersParametersEnum.maxBedroom]?: FiltersValueFieldMaxBedroomType | '';

  /**
   * Min bathrooms
   */
  [FiltersParametersEnum.minBathroom]?: FiltersValueFieldMinBathroomType | '';

  /**
   * Max bathrooms
   */
  [FiltersParametersEnum.maxBathroom]?: FiltersValueFieldMaxBathroomType | '';

  /**
   * Furnishing
   */
  [FiltersParametersEnum.furnishing]?: FiltersValueFieldFurnishedType | '';

  /**
   * How to order the results
   */
  [FiltersParametersEnum.sort]: FiltersValueFieldSortType | '';

  /**
   * Furnishing
   */
  [FiltersParametersEnum.furnishing]?: FiltersValueFieldFurnishedType | '';

  /**
   * Page number
   */
  [FiltersParametersEnum.pageNumber]: number;
}
