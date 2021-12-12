import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

import { PropertyCardTypeEnum } from './type.enum';

export type PropertyCardComponentPropsType = {
  /**
   * Property
   */
  property: PropertySerpObfuscatedType;

  /**
   * Loading
   */
  loading: boolean;

  /**
   * Card type
   * @default PropertyCardTypeEnum.classic
   */
  cardType?: PropertyCardTypeEnum;

  /**
   * Called the save button is clicked
   */
  onSaveButtonClick: (propertyId: string, isSaved: boolean) => void;

  /**
   * Trigger before moving to the PLP
   */
  onPropertyClick: () => void;
};
