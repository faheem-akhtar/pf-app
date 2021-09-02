import { backendApiPfWebsiteInternalOrigin } from './pf-website-internal-origin';
import { backendApiSecretPfWebAppUserAgent } from './secret-pf-web-app-user-agent';
import { backendApiXAkamaiDeviceCharacteristicsHeaderValue } from './x-akamai-device-characteristics-header-value';
import { backendJsonApiSync } from 'backend/json-api/sync';
import { configOriginValue } from 'config/origin/value';

import { ApiMakeFactory } from 'api/make-factory';
import { BackendJsonApiPayloadInterface } from 'backend/json-api/payload.interface';
import { helpersIsDevelopment } from 'helpers/is-development';

/**
 * Backend api factory
 */
export const BackendApiFactory = ApiMakeFactory({
  // TODO-FE[TPNX-3007] use the internal network to call the apis
  getOrigin: () => `http://${helpersIsDevelopment ? configOriginValue : backendApiPfWebsiteInternalOrigin}`,
  dataMapper: (json) => backendJsonApiSync(json as BackendJsonApiPayloadInterface),
  alterHeaders: (headers) => {
    headers['user-agent'] = backendApiSecretPfWebAppUserAgent;
    if (backendApiXAkamaiDeviceCharacteristicsHeaderValue) {
      headers['x-akamai-device-characteristics'] = backendApiXAkamaiDeviceCharacteristicsHeaderValue;
    }

    headers['Host'] =
      process.env.ENVIRONMENT === 'staging' ? configOriginValue.replace('www.', 'staging.') : configOriginValue;
  },
  requireAuth: false,
});
