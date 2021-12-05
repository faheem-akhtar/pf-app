import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export interface CallingAgentModalComponentPropsInterface {
  /**
   * The obfuscated property
   */
  property: PropertySerpObfuscatedType;

  /**
   * Ref for modal open
   */
  openRef: React.MutableRefObject<() => void>;

  /**
   * Ref for modal close
   */
  closeRef?: React.MutableRefObject<() => void>;

  /**
   * The reference id
   */
  referenceId: string;
}
