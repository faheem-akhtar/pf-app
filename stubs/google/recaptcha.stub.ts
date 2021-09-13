import { GoogleRecaptcha } from 'services/google/recaptcha';

export const googleRecaptchaStub = (mockToken: string = 'token'): GoogleRecaptcha => {
  return {
    execute: jest.fn().mockReturnValue(Promise.resolve(mockToken)),
    load: jest.fn().mockReturnValue(Promise.resolve()),
    reset: jest.fn(),
  } as unknown as GoogleRecaptcha;
};
