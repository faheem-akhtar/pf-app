export interface ApiAuthSocialLoginRequestInterface {
  data: {
    type: string;
    attributes: {
      access_token: string;
    };
  };
}
