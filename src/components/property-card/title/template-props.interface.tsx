import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export interface PropertyCardTitleTemplatePropsInterface {
  /**
   * True if we are loading property cards
   */
  loading: boolean;
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
