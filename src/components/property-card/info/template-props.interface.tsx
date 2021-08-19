import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { TFunctionType } from 'types/t-function/type';
export interface PropertyCardInfoTemplatePropsInterface {
  /**
   * Obfuscated Property
   */
  property: PropertySerpObfuscatedType;
  /**
   * Translate function
   */
  t: TFunctionType;
}
