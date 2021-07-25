import { propertySerpObfuscatedFieldUrl } from '../field/url';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetUrl = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldUrl];
};
