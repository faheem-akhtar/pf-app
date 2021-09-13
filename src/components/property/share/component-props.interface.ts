import { MutableRefObject } from 'react';

import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { TFunctionType } from 'types/t-function/type';

export interface PropertyShareComponentPropsInterface {
  /**
   * Property
   */
  property: PropertySerpObfuscatedType;

  /**
   * openRef
   */
  openRef: MutableRefObject<() => void>;

  /**
   * translation function
   */
  t: TFunctionType;
}
