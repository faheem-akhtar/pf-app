import { tealiumServiceStub } from 'stubs/tealium/service.stub';

import { TealiumAgentStatsInterface } from 'services/tealium/agent-stats.interface';
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
    window.tealium = { page_type: 'page_type', page_currency_code: 'AED' };
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

  test('if the parameters of app download event are passed to utag correctly', () => {
    AnalyticsTealiumService.onAppDownloadClicked();
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.appDownload,
      })
    );
  });

  test('if page view render event are passed the parameters correctly', () => {
    AnalyticsTealiumService.onPageViewRendered({
      tealium_event: TealiumEventEnum.search,
    });
    expect(window.utag.view).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: 'search_view',
        page_type: 'page_type',
      })
    );
  });

  test('if parameters are passed are passed to tealium for conversion-event', () => {
    const payload = { agent_id: 'agent' } as TealiumAgentStatsInterface;
    AnalyticsTealiumService.onConversionEventCalled(TealiumEventEnum.callNow, payload, {
      eventAction: TealiumEventActionEnum.call,
    });
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        ...payload,
        tealium_event: TealiumEventEnum.callNow,
        event_action: TealiumEventActionEnum.call,
        event_category: TealiumEventCategoryEnum.conversion,
      })
    );
  });

  test('if the missing parameters have default value for conversion-event', () => {
    const payload = { agent_id: 'agent' } as TealiumAgentStatsInterface;
    AnalyticsTealiumService.onConversionEventCalled(TealiumEventEnum.callNow, payload);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        ...payload,
        tealium_event: TealiumEventEnum.callNow,
        event_action: '',
        event_label: '',
        event_category: TealiumEventCategoryEnum.conversion,
      })
    );
  });
});
