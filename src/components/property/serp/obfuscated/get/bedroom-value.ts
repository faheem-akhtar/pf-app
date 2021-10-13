import { propertySerpObfuscatedFieldBedroomValue } from '../field/bedroom-value';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetBedroomValue = (property: PropertySerpObfuscatedType): number | null => {
  return (property as unknown as Record<string, number>)[propertySerpObfuscatedFieldBedroomValue];
};
