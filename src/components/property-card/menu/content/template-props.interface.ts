import { MutableRefObject } from 'react';

import { TFunctionType } from 'helpers/t-function/type';

export interface PropertyCardMenuContentTemplatePropsInterface {
  /**
   * A ref to open share modal
   */
  socialShareOpenRef: MutableRefObject<() => void>;

  /**
   * A ref to open report modal
   */
  reportOpenRef: MutableRefObject<() => void>;

  /**
   * Translate function
   */
  t: TFunctionType;
}
