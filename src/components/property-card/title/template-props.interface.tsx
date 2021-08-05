import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export interface PropertyCardTitleTemplatePropsInterface {
  /**
   * Has property has been short listed by the user
   */
  saved: boolean;
  /**
   * The obfuscated property
   */
  property: PropertySerpObfuscatedType;
  /**
   * Clicked on the saved button
   */
  onSaveButtonClick: () => void;
  /**
   * Clicked on the menu button
   */
  onMenuButtonClick: () => void;
}
