import { propertySerpObfuscatedFieldId } from '../field/id';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetId = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldId];
};
