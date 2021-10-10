import { propertySerpObfuscatedFieldAreaValue } from '../field/area-value';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetAreaValue = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldAreaValue];
};
