import { propertySerpObfuscatedFieldVerified } from '../field/verified';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetVerified = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldVerified];
};
