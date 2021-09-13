import { propertySerpObfuscatedFieldPriceText } from '../field/price-text';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetPriceText = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldPriceText];
};
