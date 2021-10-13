export type PropertyAgentResultType = {
  /**
   * Agent id
   */
  id: string;

  /**
   * Agent name
   */
  name: string;

  /**
   * Agent user id
   */
  userId: string;

  /**
   * Agent position
   */
  position: string;

  /**
   * Agent mobile number
   */
  mobileNumber: string;

  /**
   * Agent languages
   */
  languages: string[];

  /**
   * Agent profile picture url
   */
  imageSrc?: string;

  /**
   * Broker agent count
   */
  brokerAgentCount: number;

  /**
   * Broker name
   */
  brokerName: string;

  /**
   * Broker id
   */
  brokerId: string;

  /**
   * Broker location name
   */
  brokerLocationName: string;

  /**
   * Broker properties count
   */
  brokerPropertiesCount: number;
};
