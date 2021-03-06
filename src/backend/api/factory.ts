import { ApiMakeFactory } from 'api/make-factory';
import { BackendJsonApiPayloadInterface } from 'backend/json-api/payload.interface';
import { backendJsonApiSync } from 'backend/json-api/sync';
import { configOriginValue } from 'config/origin/value';
import { helpersIsDevelopment } from 'helpers/is-development';

import { backendApiXAkamaiDeviceCharacteristicsHeaderValue } from './x-akamai-device-characteristics-header-value';

/**
 * Backend api factory
 */
export const BackendApiFactory = ApiMakeFactory({
  // TODO-FE[TPNX-3007] use the internal network to call the apis
  getOrigin: () => `https://${configOriginValue}`,
  dataMapper: (json) => backendJsonApiSync(json as BackendJsonApiPayloadInterface),
  alterHeaders: (headers) => {
    if (backendApiXAkamaiDeviceCharacteristicsHeaderValue) {
      headers['x-akamai-device-characteristics'] = backendApiXAkamaiDeviceCharacteristicsHeaderValue;
    }

    if (!helpersIsDevelopment) {
      headers['x-forwarded-proto'] = 'https';
      headers['Host'] =
        process.env.ENVIRONMENT === 'staging' ? configOriginValue.replace('www.', 'staging.') : configOriginValue;
    }
  },
  requireAuth: false,
});
