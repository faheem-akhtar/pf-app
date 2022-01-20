import { configTealiumProfile } from 'config/tealium/profile';
import { TealiumCollectTypeEnum } from 'services/tealium/collect-type.enum';
import { TealiumDataLayerInterface } from 'services/tealium/data-layer.interface';
import { TealiumEventEnum } from 'services/tealium/event.enum';
import { TealiumEventActionEnum } from 'services/tealium/event-action.enum';
import { TealiumEventCategoryEnum } from 'services/tealium/event-category.enum';
import { TealiumEventLabelEnum } from 'services/tealium/event-label.enum';
import { TealiumEventTypeEnum } from 'services/tealium/event-type.enum';
import { TealiumServiceInterface } from 'services/tealium/service.interface';

const stalledEvents = new Map<TealiumEventEnum, { data: TealiumDataLayerInterface; type: TealiumCollectTypeEnum }>();

const collect = (type: TealiumCollectTypeEnum, data: TealiumDataLayerInterface): void => {
  if (typeof window.utag === 'undefined') {
    if (configTealiumProfile.enabled) {
      // eslint-disable-next-line no-console
      console.error('window.utag is not loaded');
    }
    stalledEvents.set(data.tealium_event, { data, type });
    return;
  }

  window.utag[type]({
    ...window.tealium,
    ...data,
  });
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export class AnalyticsTealium implements TealiumServiceInterface {
  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-view
  public view: TealiumServiceInterface['view'] = (data) => {
    collect(TealiumCollectTypeEnum.view, data);
  };

  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-link
  public link: TealiumServiceInterface['link'] = (data) => {
    collect(TealiumCollectTypeEnum.link, data);
  };

  public callStalledEvents = (): void => {
    if (stalledEvents.size) {
      stalledEvents.forEach(({ data, type }, tealiumEvent) => {
        window.utag[type](data);
        stalledEvents.delete(tealiumEvent);
      });
    }
  };

  // Handler for mobile app download
  public onAppDownloadClicked = (): void => {
    this.link({
      tealium_event: TealiumEventEnum.appDownload,
      event_category: TealiumEventCategoryEnum.productFeature,
      event_type: TealiumEventTypeEnum.click,
      event_action: TealiumEventActionEnum.app,
      event_label: TealiumEventLabelEnum.download,
    });
  };

  public onPageViewRendered: TealiumServiceInterface['onPageViewRendered'] = (payload) => {
    this.view(payload);
  };

  public onConversionEventCalled: TealiumServiceInterface['onConversionEventCalled'] = (event, payload, options) => {
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
  };

  public onUserRegistered: TealiumServiceInterface['onUserRegistered'] = (user) => {
    this.link({
      tealium_event: TealiumEventEnum.userRegister,
      event_type: TealiumEventTypeEnum.click,
      event_category: TealiumEventCategoryEnum.user,
      event_action: TealiumEventActionEnum.register,
      event_label: 'email',
      ...user,
    });
  };

  public onUserLoggedIn: TealiumServiceInterface['onUserLoggedIn'] = (user, provider) => {
    this.link({
      tealium_event: TealiumEventEnum.userLogin,
      event_type: TealiumEventTypeEnum.click,
      event_category: TealiumEventCategoryEnum.user,
      event_action: TealiumEventActionEnum.signIn,
      event_label: provider,
      ...user,
    });
  };

  public onUserLoggedOut: TealiumServiceInterface['onUserLoggedOut'] = (user) => {
    this.link({
      tealium_event: TealiumEventEnum.userLogout,
      event_type: TealiumEventTypeEnum.click,
      event_label: '',
      event_category: TealiumEventCategoryEnum.user,
      event_action: TealiumEventActionEnum.signOut,
      ...user,
    });
  };
}
