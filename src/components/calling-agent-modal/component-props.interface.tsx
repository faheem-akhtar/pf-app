import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export interface CallingAgentModalComponentPropsInterface {
  property: PropertySerpObfuscatedType;
  openRef: React.MutableRefObject<() => void>;
  closeRef?: React.MutableRefObject<() => void>;
  referenceId: string;
}
