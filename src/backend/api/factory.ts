import { backendApiXAkamaiDeviceCharacteristicsHeaderValue } from './x-akamai-device-characteristics-header-value';
import { backendJsonApiSync } from 'backend/json-api/sync';
import { configOriginValue } from 'config/origin/value';

import { ApiMakeFactory } from 'api/make-factory';
import { BackendJsonApiPayloadInterface } from 'backend/json-api/payload.interface';

const SECRET_PF_USER_AGENT = 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396';

/**
 * This Api factory should be used only to constract the fetchers
 */
export const BackendApiFactory = ApiMakeFactory({
  // TODO-FE[TPNX-3007] use the internal network to call the apis
  getOrigin: () => configOriginValue,
  dataMapper: (json) => backendJsonApiSync(json as BackendJsonApiPayloadInterface),
  alterHeaders: (headers) => {
    headers['user-agent'] = SECRET_PF_USER_AGENT;
    if (backendApiXAkamaiDeviceCharacteristicsHeaderValue) {
      headers['x-akamai-device-characteristics'] = backendApiXAkamaiDeviceCharacteristicsHeaderValue;
    }
  },
  requireAuth: false,
});
