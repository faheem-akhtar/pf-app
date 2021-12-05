export interface CallingAgentModalInfoComponentPropsInterface {
  /**
   * Agent Name
   * @example 'John Doe'
   */
  name?: string;

  /**
   * Agent Reference ID
   * @example 'L-182741'
   */
  referenceId: string;

  /**
   * Agent Avatar
   * @example 'https://www.propertyfinder.ae/agent/0/92/92/MODE/57192c/191636-photo.jpg?ctr=ae'
   */
  avatar?: string;

  /**
   * Agent Languages
   * @example ['English', 'Arabic']
   */
  languages?: string[];
}
