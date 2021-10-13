import { propertySerpObfuscatedFieldAgentId } from '../field/agent-id';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetAgentId = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldAgentId];
};
