import { tealiumServiceStub } from 'stubs/tealium/service.stub';

import { TealiumEventEnum } from 'services/tealium/event.enum';
import { TealiumEventActionEnum } from 'services/tealium/event-action.enum';
import { TealiumEventCategoryEnum } from 'services/tealium/event-category.enum';
import { TealiumEventLabelEnum } from 'services/tealium/event-label.enum';
import { TealiumEventTypeEnum } from 'services/tealium/event-type.enum';

import { AnalyticsTealiumService } from '../tealium.service';

describe('AnalyticsTealiumService', () => {
  const tealiumService = tealiumServiceStub();

  beforeEach(() => {
    window.utag = tealiumService;
    window.tealium = { page_type: 'page_type' };
  });

  test('if tealium events are called', () => {
    const payload = {
      tealium_event: TealiumEventEnum.appDownload,
      event_type: TealiumEventTypeEnum.click,
      event_category: TealiumEventCategoryEnum.conversion,
      event_action: TealiumEventActionEnum.app,
      event_label: TealiumEventLabelEnum.calculate,
    };

    AnalyticsTealiumService.link(payload);
    expect(tealiumService.link).toHaveBeenCalledWith({
      ...payload,
      ...window.tealium,
      page_currency_code: 'AED',
    });

    AnalyticsTealiumService.view(payload);
    expect(tealiumService.view).toHaveBeenCalledWith({
      ...payload,
      ...window.tealium,
      page_currency_code: 'AED',
    });
  });
});
