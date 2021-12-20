import { PropertyAgentResultType } from 'components/property/agent-result.type';
import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';

// TODO-FE[CX-431] Add unit tests for backendApiPropertyAgentMapper
export const backendApiPropertyAgentMapper = ([
  property,
]: BackendApiPropertyJsonApiResultType): PropertyAgentResultType => {
  const { agent, broker } = property;

  const result: PropertyAgentResultType = {
    id: agent?.id || '',
    name: agent?.name || '',
    languages: agent?.languages?.map((language) => language.name) || [],
    imageSrc: agent?.links.image_desktop || null,
    userId: agent?.user_id || '',
    mobileNumber: agent?.phone_did || '',
    position: agent?.position || '',
    brokerAgentCount: broker?.agents || 0,
    brokerId: broker?.id || '',
    brokerLocationName: broker?.location_name || '',
    brokerName: broker?.name || '',
    brokerPropertiesCount: broker?.total_properties || 0,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
  }

  return result;
};
