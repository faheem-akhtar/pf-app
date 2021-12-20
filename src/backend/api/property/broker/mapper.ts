import { PropertyBrokerResultType } from 'components/property/broker-result.type';
import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertyJsonApiResultType } from '../json-api-result.type';

// TODO-FE[CX-431] Add unit tests for backendApiPropertyBrokerMapper
export const backendApiPropertyBrokerMapper = ([
  property,
]: BackendApiPropertyJsonApiResultType): PropertyBrokerResultType => {
  const { broker } = property;
  const result: PropertyBrokerResultType = {
    id: broker?.id || '',
    agentCount: broker?.agents || 0,
    locationName: broker?.location_name || '',
    name: broker?.name || '',
    imageSrc: broker?.links.logo_178_98 || null,
    propertiesCount: broker?.total_properties || 0,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
  }

  return result;
};
