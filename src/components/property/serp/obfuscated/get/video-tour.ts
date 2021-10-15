import { PropertyVideoTourInterface } from 'components/property/video-tour.interface';

import { propertySerpObfuscatedFieldVideoTour } from '../field/video-tour';
import { PropertySerpObfuscatedType } from '../type';

export const propertySerpObfuscatedGetVideoTour = (
  property: PropertySerpObfuscatedType
): PropertyVideoTourInterface => {
  return (property as unknown as Record<string, PropertyVideoTourInterface>)[propertySerpObfuscatedFieldVideoTour];
};
