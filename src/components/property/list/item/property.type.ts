import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

import { PropertyListItemTypeEnum } from './type.enum';

export type PropertyListItemPropertyType = {
  type: PropertyListItemTypeEnum.property;
  property: PropertySerpObfuscatedType;
};
