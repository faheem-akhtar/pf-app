import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export type PropertyCardComponentPropsType = {
  property: PropertySerpObfuscatedType;
  loading: boolean;
  onSaveButtonClick: (propertyId: string, isSaved: boolean) => void;
  /**
   * Trigger before moving to the PLP
   */
  onPropertyClick: () => void;
};
