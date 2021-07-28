import { apiCookieAuthenticatorSha1 } from './sha1';

// TODO-FE[TPNX-3006] delete this file once proper auth flow is in place

const SALT_INDEX = 5;
const SECRET = 'a08d7bfd646cbea9397966e98d28238a8258623d';

const generateSalt = (): string => apiCookieAuthenticatorSha1(Date.now().toString(16)).padStart(40, '0');

const generateHash = (salt: string, cookie: string): string => {
  return apiCookieAuthenticatorSha1(`${salt}${cookie}${SECRET}`);
};

const mixHashAndSalt = (hash: string, salt: string): string =>
  `${hash.substr(0, SALT_INDEX)}${salt}${hash.substr(SALT_INDEX)}`;

/**
 * Set validation cookie check that will be used by the server to verify that request is comming from this javascript build
 * Make scrappers life harder
 * @param validationCookie
 */
export const apiCookieAuthenticatorSignCookie = (validationCookie: string): string => {
  const randomSalt = generateSalt();

  return mixHashAndSalt(generateHash(randomSalt, validationCookie), randomSalt);
};
