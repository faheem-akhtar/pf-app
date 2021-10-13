import { propertySerpObfuscatedFieldSize } from '../field/size';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetSize = (property: PropertySerpObfuscatedType): number => {
  return (property as unknown as Record<string, number>)[propertySerpObfuscatedFieldSize];
};
