import { PropertyAgentResultType } from 'components/property/agent-result.type';
import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';

// TODO-FE[CX-431] Add unit tests for backendApiPropertyBrokerMapper
export const backendApiPropertyBrokerMapper = ([
  property,
]: BackendApiPropertyJsonApiResultType): PropertyAgentResultType => {
  const { broker } = property;
  const result = {
    name: broker?.name || '',
    languages: [],
    imageSrc: broker?.links.logo_178_98,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
  }

  return result;
};
