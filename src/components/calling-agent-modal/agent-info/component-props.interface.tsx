import { PropertyAgentResultType } from 'components/property/agent-result.type';

export interface CallingAgentModalAgentInfoComponentPropsInterface
  extends Pick<PropertyAgentResultType, 'name' | 'imageSrc' | 'languages'> {
  /**
   * Agent Reference ID
   * @example 'L-182741'
   */
  referenceId: string;
}
