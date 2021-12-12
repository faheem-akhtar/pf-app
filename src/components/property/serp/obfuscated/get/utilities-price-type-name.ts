import { propertySerpObfuscatedFieldUtilitiesPriceTypeName } from '../field/utilities-price-type-name';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetUtilitiesPriceTypeName = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldUtilitiesPriceTypeName];
};
