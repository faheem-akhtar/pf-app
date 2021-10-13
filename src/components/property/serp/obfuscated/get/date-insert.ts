import { propertySerpObfuscatedFieldDateInsert } from '../field/date-insert';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetDateInsert = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldDateInsert];
};
