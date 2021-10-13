export type PropertyBrokerResultType = {
  /**
   * Broker id
   */
  id: string;

  /**
   * Broker profile picture url
   */
  imageSrc?: string;

  /**
   * Broker agent count
   */
  agentCount: number;

  /**
   * Broker name
   */
  name: string;

  /**
   * Broker location name
   */
  locationName: string;

  /**
   * Broker properties count
   */
  propertiesCount: number;
};
