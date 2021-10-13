import { propertySerpObfuscatedFieldCompletionStatus } from '../field/completion-status';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetCompletionStatus = (property: PropertySerpObfuscatedType): string | null => {
  return (property as unknown as Record<string, string | null>)[propertySerpObfuscatedFieldCompletionStatus];
};
