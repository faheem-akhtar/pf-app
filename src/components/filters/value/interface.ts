import { FiltersParametersEnum } from '../../../enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from './base-interface';
import { FiltersValueFieldAmenities } from './field/amenities';
import { FiltersValueFieldCompletionStatus } from './field/completion-status';
import { FiltersValueFieldFurnished } from './field/furnished';
import { FiltersValueFieldMaxArea } from './field/max-area';
import { FiltersValueFieldMaxBathroom } from './field/max-bathroom';
import { FiltersValueFieldMaxBedroom } from './field/max-bedroom';
import { FiltersValueFieldMaxPrice } from './field/max-price';
import { FiltersValueFieldMinArea } from './field/min-area';
import { FiltersValueFieldMinBathroom } from './field/min-bathroom';
import { FiltersValueFieldMinBedroom } from './field/min-bedroom';
import { FiltersValueFieldMinPrice } from './field/min-price';
import { FiltersValueFieldPaymentMethod } from './field/payment-method';
import { FiltersValueFieldPriceType } from './field/price-type';
import { FiltersValueFieldSort } from './field/sort';
import { FiltersValueFieldUtilitiesPriceType } from './field/utilities-price-type';
import { FiltersValueFieldVirtualViewing } from './field/virtual-viewing';
import { LocationCompactInterface } from 'components/location/compact.interface';

export interface FiltersValueInterface extends FiltersValueBaseInterface {
  /**
   * Location ids
   */
  [FiltersParametersEnum.locationsIds]: LocationCompactInterface[];

  /**
   * Min price
   */
  [FiltersParametersEnum.minPrice]: FiltersValueFieldMinPrice | '';

  /**
   * Max price
   */
  [FiltersParametersEnum.maxPrice]: FiltersValueFieldMaxPrice | '';

  /**
   * Area (Min)
   */
  [FiltersParametersEnum.minArea]: FiltersValueFieldMinArea | '';

  /**
   * Area (Max)
   */
  [FiltersParametersEnum.maxArea]: FiltersValueFieldMaxArea | '';

  /**
   * Keywords
   */
  [FiltersParametersEnum.keyword]: string;

  /**
   * Amenities
   */
  [FiltersParametersEnum.amenities]?: FiltersValueFieldAmenities[];

  /**
   * Completion status
   */
  [FiltersParametersEnum.completionStatus]?: FiltersValueFieldCompletionStatus | '';

  /**
   * Payment method
   */
  [FiltersParametersEnum.paymentMethod]?: FiltersValueFieldPaymentMethod | '';

  /**
   * Price inclusive/exclusive
   */
  [FiltersParametersEnum.utilitiesPriceType]?: FiltersValueFieldUtilitiesPriceType | '';

  /**
   * Virtual viewings
   */
  [FiltersParametersEnum.virtualViewings]?: FiltersValueFieldVirtualViewing | '';

  /**
   * Price period
   */
  [FiltersParametersEnum.pricePeriod]?: FiltersValueFieldPriceType | '';

  /**
   * Min beds
   */
  [FiltersParametersEnum.minBedroom]?: FiltersValueFieldMinBedroom | '';

  /**
   * Max beds
   */
  [FiltersParametersEnum.maxBedroom]?: FiltersValueFieldMaxBedroom | '';

  /**
   * Min bathrooms
   */
  [FiltersParametersEnum.minBathroom]?: FiltersValueFieldMinBathroom | '';

  /**
   * Max bathrooms
   */
  [FiltersParametersEnum.maxBathroom]?: FiltersValueFieldMaxBathroom | '';

  /**
   * Furnishing
   */
  [FiltersParametersEnum.furnishing]?: FiltersValueFieldFurnished | '';

  /**
   * How to order the results
   */
  [FiltersParametersEnum.sort]: FiltersValueFieldSort | '';

  /**
   * Furnishing
   */
  [FiltersParametersEnum.furnishing]?: FiltersValueFieldFurnished | '';

  /**
   * Page number
   */
  [FiltersParametersEnum.pageNumber]: number;
}
