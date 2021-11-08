import { propertySerpObfuscatedGetAgentId } from 'components/property/serp/obfuscated/get/agent-id';
import { propertySerpObfuscatedGetBrokerId } from 'components/property/serp/obfuscated/get/broker-id';
import { propertySerpObfuscatedGetOfferingTypeName } from 'components/property/serp/obfuscated/get/offering-type-name';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { AnalyticsGaService } from 'services/analytics/ga.service';

const mapAnswerToAction: Record<string, string> = {
  yes: 'propertyAvailable',
  no: 'propertyUnavailble',
  'agent-modal/not-called': 'noCall',
  'agent-modal/agent-not-answered': 'noAnswer',
};

export const callingAgentModalTracker = {
  /**
   * Trigger on Post call survey answer
   */
  onAnswerClicked: (property: PropertySerpObfuscatedType, answer: string): void => {
    const offeringType = propertySerpObfuscatedGetOfferingTypeName(property);
    const agentId = propertySerpObfuscatedGetAgentId(property);
    const brokerId = propertySerpObfuscatedGetBrokerId(property);
    const eventLabel: string[] = [offeringType || ''];

    if (agentId) {
      eventLabel.push(agentId);
    }

    if (brokerId) {
      eventLabel.push(brokerId);
    }

    AnalyticsGaService.send({
      event: 'customEvent',
      eventCategory: 'Post Lead Survey',
      eventAction: mapAnswerToAction[answer],
      eventLabel: eventLabel.join(' - '),
    });
  },
};
