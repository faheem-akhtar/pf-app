export interface ApiAuthSignInRequestInterface {
  email: string;
  password: string;
  remember_me?: boolean;
  captcha_token?: string;
}
