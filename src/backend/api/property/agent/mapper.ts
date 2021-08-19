import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';
import { PropertyAgentResultType } from 'components/property/agent-result.type';

// TODO-FE[CX-431] Add unit tests for backendApiPropertyAgentMapper
export const backendApiPropertyAgentMapper = ([
  property,
]: BackendApiPropertyJsonApiResultType): PropertyAgentResultType => {
  const { agent } = property;
  const result = {
    name: agent?.name || '',
    languages: agent?.languages?.map((language) => language.name) || [],
    imageSrc: agent?.links.image_desktop,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
  }

  return result;
};
