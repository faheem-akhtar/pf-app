export const googleGapiStub = (): typeof gapi => {
  const signInResponseMock = {
    getAuthResponse: (): gapi.auth2.AuthResponse =>
      ({
        id_token: 'id_token',
      } as gapi.auth2.AuthResponse),
  } as gapi.auth2.GoogleUser;

  return {
    load: (apiName: string, callback: gapi.LoadCallback) => callback(),
    auth2: {
      init: (): gapi.auth2.GoogleAuth =>
        ({
          signIn: () => Promise.resolve(signInResponseMock),
        } as gapi.auth2.GoogleAuth),
    },
  } as unknown as typeof gapi;
};
