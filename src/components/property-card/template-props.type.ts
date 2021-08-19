import { GalleryScrollComponentPropsInterface } from 'library/gallery-scroll/component-props.interface';
import { PropertyCardCtaButtonsGroupTemplatePropsInterface } from 'components/property-card/cta-buttons-group/template-props.interface';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { TFunctionType } from 'types/t-function/type';

export type PropertyCardTemplatePropsType = {
  /**
   * Gallery scroll props
   */
  gallery: GalleryScrollComponentPropsInterface;
  /**
   * Is propety loading
   */
  loading: boolean;
  /**
   * Obfuscated property
   */
  property: PropertySerpObfuscatedType;
  /**
   * CTA Buttons props
   */
  ctaButtons: Omit<PropertyCardCtaButtonsGroupTemplatePropsInterface, 'contactOptions'>;

  /**
   * Has property has been short listed by the user
   */
  saved: boolean;
  /**
   * Clicked on the saved button
   */
  onSaveButtonClick: () => void;
  /**
   * Clicked on the menu button
   */
  onMenuButtonClick: () => void;
  /**
   * Translate function
   */
  t: TFunctionType;
};
