export interface ApiAuthRegisterRequestInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  opted_in: boolean;
  captcha_token?: string;
}
