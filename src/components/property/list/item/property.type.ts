import { PropertyListItemTypeEnum } from './type.enum';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export type PropertyListItemPropertyType = {
  type: PropertyListItemTypeEnum.property;
  property: PropertySerpObfuscatedType;
};
