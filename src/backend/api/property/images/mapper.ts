import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { PropertyImagesResultType } from 'components/property/images-result.type';

export const backendApiPropertyImagesMapper = (
  properties: BackendApiPropertyJsonApiResultType
): PropertyImagesResultType => {
  const result: PropertyImagesResultType = properties.reduce((result, property) => {
    const { id, property_images } = property;

    result[id] = property_images || [];

    return result;
  }, {} as PropertyImagesResultType);

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).full = JSON.parse(JSON.stringify(properties));
  }

  return result;
};
