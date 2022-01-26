import { propertyStub } from 'stubs/property/stub';

import { propertySerpObfuscatedFieldAgentId } from 'components/property/serp/obfuscated/field/agent-id';
import { propertySerpObfuscatedFieldBrokerId } from 'components/property/serp/obfuscated/field/broker-id';
import { propertySerpObfuscatedFieldOfferingTypeName } from 'components/property/serp/obfuscated/field/offering-type-name';

import { callingAgentModalTracker } from '../tracker';

describe('callingAgentTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  describe('onAnswerClicked', () => {
    it('should send event', () => {
      callingAgentModalTracker.onAnswerClicked(propertyStub(), 'yes');

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'propertyAvailable',
          eventLabel: 'offering-type - agentId - broker',
        },
      ]);
    });

    it('should send event if there is no offering type', () => {
      callingAgentModalTracker.onAnswerClicked(
        propertyStub({
          [propertySerpObfuscatedFieldOfferingTypeName]: null,
        }),
        'no'
      );

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'propertyUnavailble',
          eventLabel: ' - agentId - broker',
        },
      ]);
    });

    it('should send event if there is no agent id', () => {
      callingAgentModalTracker.onAnswerClicked(
        propertyStub({
          [propertySerpObfuscatedFieldAgentId]: null,
        }),
        'no'
      );

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'propertyUnavailble',
          eventLabel: 'offering-type - broker',
        },
      ]);
    });

    it('should send event if there is no broker id', () => {
      callingAgentModalTracker.onAnswerClicked(
        propertyStub({
          [propertySerpObfuscatedFieldBrokerId]: null,
        }),
        'agent-modal/not-called'
      );

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'noCall',
          eventLabel: 'offering-type - agentId',
        },
      ]);
    });

    it('should send no answer event', () => {
      callingAgentModalTracker.onAnswerClicked(propertyStub(), 'agent-modal/agent-not-answered');

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'noAnswer',
          eventLabel: 'offering-type - agentId - broker',
        },
      ]);
    });
  });
});
