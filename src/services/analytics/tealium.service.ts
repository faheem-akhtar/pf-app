import { TealiumCollectTypeEnum } from 'services/tealium/collect-type.enum';
import { TealiumDataLayerInterface } from 'services/tealium/data-layer.interface';
import { TealiumEventEnum } from 'services/tealium/event.enum';
import { TealiumEventActionEnum } from 'services/tealium/event-action.enum';
import { TealiumEventCategoryEnum } from 'services/tealium/event-category.enum';
import { TealiumEventLabelEnum } from 'services/tealium/event-label.enum';
import { TealiumEventTypeEnum } from 'services/tealium/event-type.enum';
import { TealiumServiceInterface } from 'services/tealium/service.interface';

const collect = (collectType: TealiumCollectTypeEnum, data: TealiumDataLayerInterface): void => {
  window?.utag[collectType]({
    ...window.tealium,
    ...data,
  });
};

export const AnalyticsTealiumService: TealiumServiceInterface = {
  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-view
  view(data) {
    collect(TealiumCollectTypeEnum.view, data);
  },
  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-link
  link(data) {
    collect(TealiumCollectTypeEnum.link, data);
  },
  // Handler for mobile app download
  onAppDownloadClicked() {
    this.link({
      tealium_event: TealiumEventEnum.appDownload,
      event_category: TealiumEventCategoryEnum.productFeature,
      event_type: TealiumEventTypeEnum.click,
      event_action: TealiumEventActionEnum.app,
      event_label: TealiumEventLabelEnum.download,
    });
  },
  onPageViewRendered(payload) {
    this.view(payload);
  },
  onConversionEventCalled(event, payload, options) {
    const { eventAction, eventLabel, eventCategory, ...data } = options || {
      eventAction: '',
      eventLabel: '',
      eventCategory: TealiumEventCategoryEnum.conversion,
    };

    this.link({
      ...payload,
      tealium_event: event,
      event_action: eventAction || '',
      event_label: eventLabel || '',
      event_category: eventCategory || TealiumEventCategoryEnum.conversion,
      event_type: TealiumEventTypeEnum.click,
      ...data,
    });
  },
};
