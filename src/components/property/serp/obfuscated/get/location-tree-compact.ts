import { LocationCompactInterface } from 'types/location/compact.interface';

import { propertySerpObfuscatedFieldLocationTreeCompact } from '../field/location-tree-compact';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetLocationTreeCompact = (
  property: PropertySerpObfuscatedType
): Partial<LocationCompactInterface>[] => {
  return (property as unknown as Record<string, Partial<LocationCompactInterface>[]>)[
    propertySerpObfuscatedFieldLocationTreeCompact
  ];
};
