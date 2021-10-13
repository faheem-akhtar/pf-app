import { propertySerpObfuscatedFieldBathroomValue } from '../field/bathroom-value';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetBathroomValue = (property: PropertySerpObfuscatedType): number | null => {
  return (property as unknown as Record<string, number>)[propertySerpObfuscatedFieldBathroomValue];
};
