import { backendFiltersValueDefault } from 'backend/filters/value/default';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { SaveSearchPayloadFilterKeysEnum } from 'enums/save-search/payload-filter-keys.enum';
import { functionSelf } from 'helpers/function/self';
import { stringToNumber } from 'helpers/string/to-number';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { SaveSearchFilterAndMapType } from './filter-and-map.type';
import { SaveSearchFilterAndMapValueType } from './filter-and-map-value.type';
import { SaveSearchFiltersInterface } from './filters.interface';

const toNumberOrFalse: SaveSearchFilterAndMapType = (value) => !!value && stringToNumber(value as string);

const toArrayOrFalse: SaveSearchFilterAndMapType = (value) => !!(value as string[]).length && value;

const valueOfFalse: SaveSearchFilterAndMapType = (value) => !!value && value;

const mapper: {
  [key in FiltersParametersEnum]?: {
    newKey: SaveSearchPayloadFilterKeysEnum;
    filterAndMap: SaveSearchFilterAndMapType;
  };
} = {
  [FiltersParametersEnum.categoryId]: {
    filterAndMap: (value) => stringToNumber(value as string),
    newKey: SaveSearchPayloadFilterKeysEnum.CATEGORY_ID,
  },

  [FiltersParametersEnum.propertyTypeId]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.PROPERTY_TYPE_ID,
  },

  [FiltersParametersEnum.minPrice]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MIN_PRICE,
  },

  [FiltersParametersEnum.maxPrice]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MAX_PRICE,
  },

  [FiltersParametersEnum.minBedroom]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MIN_BEDROOM,
  },

  [FiltersParametersEnum.maxBedroom]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MAX_BEDROOM,
  },

  [FiltersParametersEnum.minBathroom]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MIN_BATHROOM,
  },

  [FiltersParametersEnum.maxBathroom]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MAX_BATHROOM,
  },

  [FiltersParametersEnum.minArea]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MIN_AREA,
  },

  [FiltersParametersEnum.maxArea]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MAX_AREA,
  },

  [FiltersParametersEnum.pricePeriod]: {
    filterAndMap: functionSelf,
    newKey: SaveSearchPayloadFilterKeysEnum.PRICE_TYPE,
  },

  [FiltersParametersEnum.locationsIds]: {
    filterAndMap: (value) =>
      !!(value as string[]).length && (value as unknown as LocationCompactInterface[]).map((item) => item.id),
    newKey: SaveSearchPayloadFilterKeysEnum.LOCATION_IDS,
  },

  [FiltersParametersEnum.query]: {
    filterAndMap: valueOfFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.QUERY,
  },

  [FiltersParametersEnum.keyword]: {
    filterAndMap: valueOfFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.KEYWORD,
  },

  [FiltersParametersEnum.amenities]: {
    filterAndMap: toArrayOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.AMENITIES,
  },

  [FiltersParametersEnum.furnishing]: {
    filterAndMap: (value) =>
      backendFiltersValueDefault[FiltersParametersEnum.furnishing] === value
        ? undefined
        : stringToNumber(value as string),
    newKey: SaveSearchPayloadFilterKeysEnum.FURNISHED,
  },

  [FiltersParametersEnum.completionStatus]: {
    filterAndMap: valueOfFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.COMPLETION_STATUS,
  },

  [FiltersParametersEnum.virtualViewings]: {
    filterAndMap: valueOfFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.VIRTUAL_VIEWING,
  },

  [FiltersParametersEnum.isDeveloperProperty]: {
    filterAndMap: functionSelf,
    newKey: SaveSearchPayloadFilterKeysEnum.IS_DEVELOPER_PROPERTY,
  },

  [FiltersParametersEnum.minInstallmentYears]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MIN_INSTALLMENT_YEARS,
  },

  [FiltersParametersEnum.maxInstallmentYears]: {
    filterAndMap: toNumberOrFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.MAX_INSTALLMENT_YEARS,
  },

  [FiltersParametersEnum.paymentMethod]: {
    filterAndMap: valueOfFalse,
    newKey: SaveSearchPayloadFilterKeysEnum.PAYMENT_METHOD,
  },
};

/**
 *
 * @param filters active filters on the page
 * @returns filtered object to send to the create save search request
 */
export function saveSearchFiltersMapper(filters: FiltersValueInterface): SaveSearchFiltersInterface {
  return (Object.keys(filters) as Array<keyof FiltersValueInterface>).reduce((acc, key) => {
    const value = mapper[key]?.filterAndMap(filters[key] as SaveSearchFilterAndMapValueType);
    const newKey = mapper[key]?.newKey as keyof SaveSearchFiltersInterface;
    if (typeof value !== 'undefined' && value !== false && value !== '') {
      acc[newKey] = value as never;
    }
    return acc;
  }, {} as SaveSearchFiltersInterface);
}
