export interface TealiumUserInterface {
  /**
   * user id
   */
  user_id: string;

  /**
   * user e-mail
   */
  user_email: string;

  /**
   * user status
   */
  user_status: 'Logged In' | 'Not Logged In';
}
