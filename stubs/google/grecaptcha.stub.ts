export const googleGrecaptchaStub = (tokenMock: string): typeof grecaptcha => {
  return {
    execute: jest.fn(),
    reset: jest.fn(),
    render: ((container, parameters: { callback: (response: string) => void }) =>
      parameters.callback(tokenMock)) as typeof grecaptcha.render,
  } as unknown as typeof grecaptcha;
};
