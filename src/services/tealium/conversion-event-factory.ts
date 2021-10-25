import { apiAgentFetcher } from 'api/agent/fetcher';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';

import { tealiumAdapterPropertyStats } from './adapter/property-stats';
import { TealiumConversionEventOptionsInterface } from './conversion-event-options.interface';
import { TealiumEventEnum } from './event.enum';
import { TealiumEventActionEnum } from './event-action.enum';
import { TealiumEventCategoryEnum } from './event-category.enum';
import { TealiumEventLabelEnum } from './event-label.enum';

const galleryEventFiredPropertyIds: string[] = [];

export const TealiumConversionEventFactory = (
  property: PropertySerpObfuscatedType,
  filters: FiltersValueInterface,
  config?: { isTransactionalEvent?: boolean }
): Record<string, Function> => {
  const propertyId = propertySerpObfuscatedGetId(property);

  const sendTealiumConversionEvent = ({ event, ...payload }: TealiumConversionEventOptionsInterface): void => {
    apiAgentFetcher(propertyId).then((response) => {
      if (response.ok) {
        const { data } = response;

        AnalyticsTealiumService().onConversionEventCalled(
          event,
          {
            ...tealiumAdapterPropertyStats(property, filters, {
              isTransactionalEvent: config?.isTransactionalEvent,
            }),
            agent_id: data.id,
            agent_mobile_number: data.mobileNumber,
            agent_name: data.name,
            agent_title: data.position,
            agent_user_id: data.userId,
            broker_agents_qty: `${data.brokerAgentCount}`,
            broker_id: data.brokerId,
            broker_location: data.brokerLocationName,
            broker_name: data.brokerName,
            broker_properties_qty: `${data.brokerPropertiesCount}`,
          },
          payload
        );
      } else {
        // eslint-disable-next-line no-console
        console.error('failed to send tealium conversion event ', response.error);
      }
    });
  };

  return {
    sendCallEvent: (): void => {
      sendTealiumConversionEvent({
        event: TealiumEventEnum.callNow,
        eventAction: TealiumEventActionEnum.call,
        eventLabel: TealiumEventLabelEnum.callDirect,
      });
    },
    sendWhatsappEvent: (): void => {
      sendTealiumConversionEvent({
        event: TealiumEventEnum.whatsappNow,
        eventAction: TealiumEventActionEnum.whatsapp,
      });
    },
    sendSavePropertyEvent: (): void => {
      sendTealiumConversionEvent({
        event: TealiumEventEnum.saveProperty,
        eventLabel: TealiumEventLabelEnum.save,
        eventCategory: TealiumEventCategoryEnum.productFeature,
        eventAction: TealiumEventActionEnum.savedProperties,
      });
    },
    sendEmailEvent: (): void => {
      sendTealiumConversionEvent({
        event: TealiumEventEnum.emailNow,
        eventAction: TealiumEventActionEnum.email,
        eventLabel: TealiumEventLabelEnum.email,
      });
    },
    sendEmailSignupEvent: (userEmail: string): void => {
      sendTealiumConversionEvent({
        event: TealiumEventEnum.emailSignup,
        eventCategory: TealiumEventCategoryEnum.productFeature,
        eventAction: TealiumEventActionEnum.emailAlert,
        eventLabel: TealiumEventLabelEnum.signUp,
        user_email: userEmail,
      });
    },
    sendGalleryScrollEvent: (propertyId: string, imageLength: number): void => {
      if (!galleryEventFiredPropertyIds.includes(propertyId)) {
        sendTealiumConversionEvent({
          event: TealiumEventEnum.scrollGalleryModal,
          eventCategory: TealiumEventCategoryEnum.userInteraction,
          gallery_scroll_count: [`${imageLength}`],
        });
        galleryEventFiredPropertyIds.push(propertyId);
      }
    },
  };
};
