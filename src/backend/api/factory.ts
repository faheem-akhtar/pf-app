import { apiCookieAuthenticatorSignCookie } from '../../api/cookie-authenticator/sign-cookie';
import { backendJsonApiSync } from 'backend/json-api/sync';
import { configOriginValue } from 'config/origin/value';

import { ApiMakeFactory } from '../../api/make-factory';
import { BackendJsonApiPayloadInterface } from 'backend/json-api/payload.interface';

// TODO-FE[TPNX-3006] delete it once proper auth flow is in place
const captchaAuthenticatorCookie = '0d5d23b0a8d20d4c43efda4850277f59cc22d534';

/**
 * This Api factory should be used only to constract the fetchers
 */
export const BackendApiFactory = ApiMakeFactory({
  // TODO-FE[TPNX-3007] use the internal network to call the apis
  getOrigin: () => configOriginValue,
  dataMapper: (json) => backendJsonApiSync(json as BackendJsonApiPayloadInterface),
  alterHeaders: (headers) => {
    // TODO-FE[TPNX-3006] remove this headers once web-app search auth is allowed using other authentication mechanizm
    headers['X-Utgz'] = apiCookieAuthenticatorSignCookie(captchaAuthenticatorCookie);
    headers['cookie'] = `captcha_authenticator=${captchaAuthenticatorCookie}`;
    headers['user-agent'] = 'PostmanRuntime/1';
  },
});
