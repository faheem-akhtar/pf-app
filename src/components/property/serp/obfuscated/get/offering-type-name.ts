import { propertySerpObfuscatedFieldOfferingTypeName } from '../field/offering-type-name';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetOfferingTypeName = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldOfferingTypeName];
};
