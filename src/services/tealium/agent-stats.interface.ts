import { TealiumPropertyStatsInterface } from './property-stats.interface';

export interface TealiumAgentStatsInterface extends TealiumPropertyStatsInterface {
  agent_id: string;
  agent_mobile_number: string;
  agent_name: string;
  agent_title: string;
  agent_user_id: string;
  broker_agents_qty: string;
  broker_id: string;
  broker_location: string;
  broker_name: string;
  broker_properties_qty: string;
}
