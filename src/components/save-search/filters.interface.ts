import { SaveSearchPayloadFilterKeysEnum } from 'enums/save-search/payload-filter-keys.enum';

export interface SaveSearchFiltersInterface {
  /**
   * Category id as number
   */
  [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: number;
  /**
   * Property type as number
   */
  [SaveSearchPayloadFilterKeysEnum.PROPERTY_TYPE_ID]?: number;
  /**
   * Min price as number
   */
  [SaveSearchPayloadFilterKeysEnum.MIN_PRICE]?: number;
  /**
   * Max price as number
   */
  [SaveSearchPayloadFilterKeysEnum.MAX_PRICE]?: number;
  /**
   * Min bedroom as number
   */
  [SaveSearchPayloadFilterKeysEnum.MIN_BEDROOM]?: number;
  /**
   * Max bedroom as number
   */
  [SaveSearchPayloadFilterKeysEnum.MAX_BEDROOM]?: number;
  /**
   * Min bathroom as number
   */
  [SaveSearchPayloadFilterKeysEnum.MIN_BATHROOM]?: number;
  /**
   * Max bathroom as number
   */
  [SaveSearchPayloadFilterKeysEnum.MAX_BATHROOM]?: number;
  /**
   * Min min_area as number
   */
  [SaveSearchPayloadFilterKeysEnum.MIN_AREA]?: number;
  /**
   * Max min_area as number
   */
  [SaveSearchPayloadFilterKeysEnum.MAX_AREA]?: number;
  /**
   * Price type period
   */
  [SaveSearchPayloadFilterKeysEnum.PRICE_TYPE]?: string;
  /**
   * Array of location ids
   */
  [SaveSearchPayloadFilterKeysEnum.LOCATION_IDS]?: string[];
  /**
   * Current query
   */
  [SaveSearchPayloadFilterKeysEnum.QUERY]?: string;
  /**
   * Current used keywords
   */
  [SaveSearchPayloadFilterKeysEnum.KEYWORD]?: string;
  /**
   * Array of selected amenities
   */
  [SaveSearchPayloadFilterKeysEnum.AMENITIES]?: string[];
  /**
   * Furnishing as number
   */
  [SaveSearchPayloadFilterKeysEnum.FURNISHED]?: number;
  /**
   * Completion status
   */
  [SaveSearchPayloadFilterKeysEnum.COMPLETION_STATUS]?: string;
  /**
   * Virtual viewing setting
   */
  [SaveSearchPayloadFilterKeysEnum.VIRTUAL_VIEWING]?: string;
  /**
   * Payment method setting
   */
  [SaveSearchPayloadFilterKeysEnum.PAYMENT_METHOD]?: string;
}
