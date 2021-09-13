import { propertySerpObfuscatedFieldPropertyTypeName } from '../field/property-type-name';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetPropertyTypeName = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldPropertyTypeName];
};
