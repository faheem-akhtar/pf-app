import google from 'google-one-tap';

export const googleOneTapStub = (responseMock: google.CredentialResponse): typeof google => {
  return {
    accounts: {
      id: {
        initialize: (idConfiguration: { callback: (credentialResponse: google.CredentialResponse) => void }) =>
          idConfiguration.callback(responseMock),
        prompt: jest.fn(),
      },
    },
  } as unknown as typeof google;
};
