import { propertySerpObfuscatedFieldImagesCount } from '../field/images-count';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetImagesCount = (property: PropertySerpObfuscatedType): number => {
  return (property as unknown as Record<string, number>)[propertySerpObfuscatedFieldImagesCount];
};
