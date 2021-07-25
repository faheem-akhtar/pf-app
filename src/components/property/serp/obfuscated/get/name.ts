import { propertySerpObfuscatedFieldName } from '../field/name';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetName = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldName];
};
