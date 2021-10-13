import { propertySerpObfuscatedFieldBrokerId } from '../field/broker-id';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetBrokerId = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldBrokerId];
};
