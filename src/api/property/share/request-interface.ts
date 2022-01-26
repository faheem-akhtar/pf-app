export interface ApiPropertyShareRequestInterface {
  /**
   * User's mail
   */
  email: string;

  /**
   * Friend's mail
   */
  friend_email: string;

  /**
   * message
   */
  message: string;

  /**
   * Captcha token
   */
  captcha_token: string;
}
