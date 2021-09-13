import { GoogleRecaptcha } from './recaptcha';

const googleRecaptcha = new GoogleRecaptcha();

export const GoogleRecaptchaService = (): GoogleRecaptcha => {
  return googleRecaptcha;
};
