import { propertySerpObfuscatedFieldPublishDateValue } from '../field/publish-date-value';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetPublishDateValue = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldPublishDateValue];
};
