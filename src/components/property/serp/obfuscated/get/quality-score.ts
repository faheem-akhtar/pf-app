import { propertySerpObfuscatedFieldQualityScore } from '../field/quality-score';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetQualityScore = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldQualityScore];
};
