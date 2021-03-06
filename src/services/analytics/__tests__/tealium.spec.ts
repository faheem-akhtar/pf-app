import { mockWindowConsole } from 'mocks/window/console.mock';
import { tealiumServiceStub } from 'stubs/tealium/service.stub';
import { userModelStub } from 'stubs/user/model.stub';

import { TealiumAgentStatsInterface } from 'services/tealium/agent-stats.interface';
import { TealiumEventEnum } from 'services/tealium/event.enum';
import { TealiumEventInterface } from 'services/tealium/event.interface';
import { TealiumEventActionEnum } from 'services/tealium/event-action.enum';
import { TealiumEventCategoryEnum } from 'services/tealium/event-category.enum';
import { TealiumEventLabelEnum } from 'services/tealium/event-label.enum';
import { TealiumEventTypeEnum } from 'services/tealium/event-type.enum';

import { AnalyticsTealium } from '../tealium';

jest.mock('config/tealium/profile', () => {
  return {
    configTealiumProfile: {
      enabled: true,
      id: 'uae',
    },
  };
});

describe('AnalyticsTealium', () => {
  const tealiumService = tealiumServiceStub();
  const userModel = userModelStub();
  const analyticsTealium = new AnalyticsTealium();

  beforeEach(() => {
    window.utag = tealiumService;
    window.tealium = { page_type: 'page_type', page_currency_code: 'AED' };
  });

  test('if the events are fired after utag is loaded', () => {
    const consoleMock = mockWindowConsole();
    window.utag = undefined;
    const payload = { tealium_event: TealiumEventEnum.search };
    analyticsTealium.view(payload);
    analyticsTealium.link({ tealium_event: TealiumEventEnum.smsNow } as TealiumEventInterface);
    expect(consoleMock.error).toHaveBeenCalledWith('window.utag is not loaded');

    window.utag = tealiumServiceStub();
    analyticsTealium.callStalledEvents();

    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.smsNow,
      })
    );
    expect(window.utag.view).toHaveBeenCalledWith(expect.objectContaining(payload));
  });

  test('if tealium events are called', () => {
    const payload = {
      tealium_event: TealiumEventEnum.appDownload,
      event_type: TealiumEventTypeEnum.click,
      event_category: TealiumEventCategoryEnum.conversion,
      event_action: TealiumEventActionEnum.app,
      event_label: TealiumEventLabelEnum.calculate,
    };

    analyticsTealium.link(payload);
    expect(tealiumService.link).toHaveBeenCalledWith({
      ...payload,
      ...window.tealium,
      page_currency_code: 'AED',
    });

    analyticsTealium.view(payload);
    expect(tealiumService.view).toHaveBeenCalledWith({
      ...payload,
      ...window.tealium,
      page_currency_code: 'AED',
    });
  });

  test('if user-register event is called with correct payload', () => {
    analyticsTealium.onUserRegistered({
      user_email: userModel.email,
      user_id: userModel.userId,
      user_status: 'Logged In',
    });
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userRegister,
        user_email: userModel.email,
        user_id: userModel.userId,
        user_status: 'Logged In',
      })
    );
  });

  test('if user-login event is called with correct payload - google', () => {
    analyticsTealium.onUserLoggedIn(
      {
        user_email: userModel.email,
        user_id: userModel.userId,
        user_status: 'Logged In',
      },
      'google'
    );
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userLogin,
        event_label: 'google',
        user_email: userModel.email,
        user_id: userModel.userId,
        user_status: 'Logged In',
      })
    );
  });

  test('if the parameters of app download event are passed to utag correctly', () => {
    analyticsTealium.onAppDownloadClicked();
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.appDownload,
      })
    );
  });

  test('if page view render event are passed the parameters correctly', () => {
    analyticsTealium.onPageViewRendered({
      tealium_event: TealiumEventEnum.search,
    });
    expect(window.utag.view).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: 'search_view',
        page_type: 'page_type',
      })
    );
  });

  test('if parameters are passed to tealium for conversion-event', () => {
    const payload = { agent_id: 'agent' } as TealiumAgentStatsInterface;
    analyticsTealium.onConversionEventCalled(TealiumEventEnum.callNow, payload, {
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
    analyticsTealium.onConversionEventCalled(TealiumEventEnum.callNow, payload);
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
