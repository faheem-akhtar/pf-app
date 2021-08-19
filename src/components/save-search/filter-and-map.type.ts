import { SaveSearchFilterAndMapValueType } from './filter-and-map-value.type';

export type SaveSearchFilterAndMapType = (
  value: SaveSearchFilterAndMapValueType
) => string | number | string[] | boolean | undefined;
