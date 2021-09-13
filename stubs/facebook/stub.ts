export const facebookStub = (statusResponse: { authResponse: { accessToken: string } }): typeof FB => {
  return {
    init: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    login: ((callback, options) => callback(statusResponse as any)) as typeof FB.login,
  } as unknown as typeof FB;
};
