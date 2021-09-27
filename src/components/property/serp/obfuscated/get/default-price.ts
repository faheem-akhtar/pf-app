import { propertySerpObfuscatedFieldDefaultPrice } from '../field/default-price';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetDefaultPrice = (property: PropertySerpObfuscatedType): number => {
  return (property as unknown as Record<string, number>)[propertySerpObfuscatedFieldDefaultPrice];
};
