import { propertySerpObfuscatedFieldImgUrl } from '../field/img-url';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetImgUrl = (property: PropertySerpObfuscatedType): string => {
  return (property as unknown as Record<string, string>)[propertySerpObfuscatedFieldImgUrl];
};
