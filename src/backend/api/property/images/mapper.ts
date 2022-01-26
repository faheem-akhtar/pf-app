import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { BackendApiPropertyImagesType } from './type';

// TODO-FE[CX-409] add tests
export const backendApiPropertyImagesMapper = (
  properties: BackendApiPropertyJsonApiResultType
): BackendApiPropertyImagesType => {
  const result: BackendApiPropertyImagesType = properties.reduce((result, property) => {
    const { id, property_images } = property;

    result[id] = property_images || [];

    return result;
  }, {} as BackendApiPropertyImagesType);

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(properties));
  }

  return result;
};
