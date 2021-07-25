import { propertySerpObfuscatedFieldExclusive } from '../field/exclusive';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetExclusive = (property: PropertySerpObfuscatedType): boolean => {
  return (property as unknown as Record<string, boolean>)[propertySerpObfuscatedFieldExclusive];
};
