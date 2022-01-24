import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { FiltersValueBaseInterface } from './base-interface';
import { FiltersValueFieldAmenitiesType } from './field/amenities.type';
import { FiltersValueFieldBathroomsType } from './field/bathrooms.type';
import { FiltersValueFieldBedroomsType } from './field/bedrooms.type';
import { FiltersValueFieldCompletionStatusType } from './field/completion-status.type';
import { FiltersValueFieldFurnishedType } from './field/furnished.type';
import { FiltersValueFieldPaymentMethodType } from './field/payment-method.type';
import { FiltersValueFieldPricePeriodType } from './field/price-period.type';
import { FiltersValueFieldSortType } from './field/sort.type';
import { FiltersValueFieldUtilitiesPriceTypeType } from './field/utilities-price-type.type';
import { FiltersValueFieldVirtualViewingType } from './field/virtual-viewing.type';

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
   * Bedrooms
   */
  [FiltersParametersEnum.bedrooms]?: FiltersValueFieldBedroomsType[];

  /**
   * Bathrooms
   */
  [FiltersParametersEnum.bathrooms]?: FiltersValueFieldBathroomsType[];

  /**
   * Furnishing
   */
  [FiltersParametersEnum.furnishing]?: FiltersValueFieldFurnishedType | '';

  /**
   * Is developer property
   */
  [FiltersParametersEnum.isDeveloperProperty]?: boolean;

  /**
   * Min installment years
   */
  [FiltersParametersEnum.minInstallmentYears]?: number | null;

  /**
   * Max installment years
   */
  [FiltersParametersEnum.maxInstallmentYears]?: number | null;

  /**
   * How to order the results
   */
  [FiltersParametersEnum.sort]: FiltersValueFieldSortType | '';

  /**
   * Page number
   */
  [FiltersParametersEnum.pageNumber]: number;
}
