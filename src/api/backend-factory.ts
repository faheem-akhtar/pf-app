import { JsonApiPayloadInterface } from 'helpers/json-api/payload.interface';
import { apiCookieAuthenticatorSignCookie } from './cookie-authenticator/sign-cookie';
import { apiMakeFactory } from './make-factory';
import { jsonApiSync } from 'helpers/json-api/sync';

// TODO-FE[TPNX-3006] delete it once proper auth flow is in place
const captchaAuthenticatorCookie = '0d5d23b0a8d20d4c43efda4850277f59cc22d534';

/**
 * This Api factory should be used only to constract the fetchers
 */
export const apiBackendFactory = apiMakeFactory({
  // TODO-FE[TPNX-3008] read origin for serverside from the config
  // TODO-FE[TPNX-3007] use the internal network to call the apis
  getOrigin: () => 'https://propertyfinder.ae',
  dataMapper: (json) => jsonApiSync(json as unknown as JsonApiPayloadInterface),
  alterHeaders: (headers) => {
    // TODO-FE[TPNX-3006] remove this headers once web-app search auth is allowed using other authentication mechanizm
    headers['X-Utgz'] = apiCookieAuthenticatorSignCookie(captchaAuthenticatorCookie);
    headers['cookie'] = `captcha_authenticator=${captchaAuthenticatorCookie}`;
    headers['user-agent'] = 'PostmanRuntime/1';
  },
});
