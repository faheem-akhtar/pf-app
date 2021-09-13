import { AdConfigInterface } from 'types/ad/config.interface';

import { PropertySerpObfuscatedType } from '../serp/obfuscated/type';

export interface PropertyListComponentPropsInterface {
  properties: PropertySerpObfuscatedType[];
  adConfig: AdConfigInterface;
  pageIsLoading: boolean;
}
