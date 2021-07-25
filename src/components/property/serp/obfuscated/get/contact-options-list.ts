import { PropertyContactOptionsListInterace } from 'components/property/contact-option-list.interface';
import { propertySerpObfuscatedFieldContactOptionsList } from '../field/contact-options-list';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetContactOptionsList = (
  property: PropertySerpObfuscatedType
): PropertyContactOptionsListInterace => {
  return (property as unknown as Record<string, PropertyContactOptionsListInterace>)[
    propertySerpObfuscatedFieldContactOptionsList
  ];
};
