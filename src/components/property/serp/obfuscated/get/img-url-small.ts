import { propertySerpObfuscatedFieldImgUrlSmall } from '../field/img-url-small';
import { PropertySerpObfuscatedType } from '../type';

// TODO-FE[CX-373] remove propertySerpObfuscatedGetImgUrlSmall
export const propertySerpObfuscatedGetImgUrlSmall = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldImgUrlSmall];
};
