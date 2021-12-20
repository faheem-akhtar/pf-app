export type PropertyBrokerResultType = {
  /**
   * Broker id
   */
  id: string;

  /**
   * Broker profile picture url
   */
  imageSrc: string | null;

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
