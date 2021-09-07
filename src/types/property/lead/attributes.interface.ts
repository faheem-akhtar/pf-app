export interface PropertyLeadAttributesInterface {
  /**
   * User's name
   */
  name: string;

  /**
   * User's mail
   */
  email: string;

  /**
   * User's phone number
   */
  phone: string;

  /**
   * User's message
   */
  message: string;

  /**
   * Captcha verification token
   */
  captcha_token?: string;

  /**
   * Accept terms and conditions
   */
  acceptTerms?: boolean;

  /**
   * Accept receive advertising
   */
  receiveAdvertising?: boolean;
}
