import { propertySerpObfuscatedFieldLiveEventValue } from '../field/live-event-value';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetLiveEventValue = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldLiveEventValue];
};
