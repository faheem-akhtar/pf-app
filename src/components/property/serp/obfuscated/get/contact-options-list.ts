import { PropertyContactOptionsListInterface } from 'components/property/contact-options-list.interface';
import { propertySerpObfuscatedFieldContactOptionsList } from '../field/contact-options-list';

import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetContactOptionsList = (
  property: PropertySerpObfuscatedType
): PropertyContactOptionsListInterface => {
  return (property as unknown as Record<string, PropertyContactOptionsListInterface>)[
    propertySerpObfuscatedFieldContactOptionsList
  ];
};
