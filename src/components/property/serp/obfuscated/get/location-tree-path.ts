import { propertySerpObfuscatedFieldLocationTreePath } from '../field/location-tree-path';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetLocationTreePath = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldLocationTreePath];
};
