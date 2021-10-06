import { configCommon } from 'config/common';
import { TealiumCollectTypeEnum } from 'services/tealium/collect-type.enum';
import { TealiumDataLayerInterface } from 'services/tealium/data-layer.interface';
import { TealiumUtagInterface } from 'services/tealium/utag.interface';

const collect = (event: TealiumCollectTypeEnum, data: TealiumDataLayerInterface): void => {
  window?.utag[event]({
    ...data,
    page_currency_code: configCommon.currencyCode,
    page_type: window.tealium.page_type,
  });
};

export const AnalyticsTealiumService: TealiumUtagInterface = {
  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-view
  view: (data) => {
    collect(TealiumCollectTypeEnum.view, data);
  },
  // doc: https://docs.tealium.com/platforms/javascript/api/tracking-functions/#utag-link
  link: (data) => {
    collect(TealiumCollectTypeEnum.link, data);
  },
};
