export interface ApiAuthRegisterRequestInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  opted_in: string;
  captcha_token?: string;
}
