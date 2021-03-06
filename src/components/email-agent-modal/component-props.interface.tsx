import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export interface EmailAgentModalComponentPropsInterface {
  /**
   * A ref to access an element
   */
  openRef: React.MutableRefObject<() => void>;

  /**
   * Property
   */
  property: PropertySerpObfuscatedType;

  /**
   * Form submitted handler
   */
  onFormSubmitted?: (email: string, isEmailAlertEnabled: boolean) => void;
}
