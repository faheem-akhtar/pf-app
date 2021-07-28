export interface PropertyContactOptionsListInterface {
  /**
   * Contact phone
   */
  phone: {
    type: string;
    value: string;
    link: string;
    is_did: boolean;
  };

  /**
   * Contact using email available
   */
  email: boolean;

  /**
   * Contact whatsapp
   */
  whatsapp?: {
    type: string;
    value: string;
    link: string;
  };

  /**
   * Contact sms
   */
  sms?: {
    type: string;
    value: string;
    link: string;
  };
}
