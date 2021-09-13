import { propertySerpObfuscatedFieldListingLevel } from '../field/listing-level';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetListingLevel = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldListingLevel];
};
