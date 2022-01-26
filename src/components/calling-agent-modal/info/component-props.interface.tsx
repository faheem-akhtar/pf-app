import { PropertyAgentInterface } from 'components/property/agent-interface';

export interface CallingAgentModalInfoComponentPropsInterface
  extends Pick<PropertyAgentInterface, 'name' | 'imageSrc' | 'languages'> {
  /**
   * Agent Reference ID
   * @example 'L-182741'
   */
  referenceId: string;
}
