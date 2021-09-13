import { propertySerpObfuscatedFieldReference } from '../field/reference';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetReference = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldReference];
};
