import { mockWindowConsole } from 'mocks/window/console.mock';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertyAgentStub } from 'stubs/property/agent.stub';
import { propertyStub } from 'stubs/property/stub';
import { tealiumServiceStub } from 'stubs/tealium/service.stub';

import * as apiAgentFetcherModule from 'api/agent/fetcher';

import { tealiumAdapterPropertyStats } from '../adapter/property-stats';
import { TealiumConversionEventFactory } from '../conversion-event-factory';
import { TealiumEventEnum } from '../event.enum';

jest.mock('api/agent/fetcher');

describe('TealiumConversionEventFactory', () => {
  const property = propertyStub();
  const filters = filtersValueStub();

  let tealiumEvents: ReturnType<typeof TealiumConversionEventFactory>;

  beforeEach(() => {
    window.utag = tealiumServiceStub();
    window.tealium = { page_type: 'page_type' };
    mockWindowConsole();
    (apiAgentFetcherModule.apiAgentFetcher as jest.Mock).mockReset();
    tealiumEvents = TealiumConversionEventFactory(property, filters);
  });

  describe('tealiumEvents - agent-data is fetched', () => {
    const agentDataPromise = Promise.resolve({ ok: true, data: propertyAgentStub });
    beforeEach(() => {
      (apiAgentFetcherModule.apiAgentFetcher as jest.Mock).mockImplementation(() => agentDataPromise);
    });

    it('sendCallEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendCallEvent();
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.callNow,
          page_type: 'page_type',
        })
      );
    });

    it('sendSavePropertyEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendSavePropertyEvent();
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.saveProperty,
          page_type: 'page_type',
        })
      );
    });

    it('sendWhatsappEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendWhatsappEvent();
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.whatsappNow,
          page_type: 'page_type',
        })
      );
    });

    it('sendEmailEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendEmailEvent();
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.emailNow,
          page_type: 'page_type',
        })
      );
    });

    it('sendEmailSignupEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendEmailSignupEvent('lorem@ipsum.com');
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.emailSignup,
          user_email: 'lorem@ipsum.com',
          page_type: 'page_type',
        })
      );
    });

    it('sendGalleryScrollEvent - should call tealium event if agent-data is fetched successfully', async () => {
      tealiumEvents.sendGalleryScrollEvent('property_id', 3);
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.scrollGalleryModal,
          gallery_scroll_count: ['3'],
          page_type: 'page_type',
        })
      );
    });

    it('sendGalleryScrollEvent - should not call tealium event if it`s already sent for the same property-id', async () => {
      tealiumEvents.sendGalleryScrollEvent('propertyId', 3);
      await agentDataPromise;
      expect(window.utag.link).toHaveBeenCalledWith(
        expect.objectContaining({
          ...tealiumAdapterPropertyStats(property, filters),
          tealium_event: TealiumEventEnum.scrollGalleryModal,
          gallery_scroll_count: ['3'],
          page_type: 'page_type',
        })
      );
      tealiumEvents.sendGalleryScrollEvent('propertyId', 3);
      expect(window.utag.link).toHaveBeenCalledTimes(1);
    });
  });

  describe('tealiumEvents - agent data is not fetched', () => {
    const agentDataPromise = Promise.resolve({ ok: false });
    beforeEach(() => {
      (apiAgentFetcherModule.apiAgentFetcher as jest.Mock).mockImplementation(() => agentDataPromise);
    });

    it('sendCallEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendCallEvent();
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });

    it('sendWhatsappEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendWhatsappEvent();
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });

    it('sendSavePropertyEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendSavePropertyEvent();
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });

    it('sendEmailEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendEmailEvent();
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });

    it('sendEmailSignupEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendEmailSignupEvent('lorem@ipsum.com');
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });

    it('sendGalleryScrollEvent - should not call tealium event if agent-data is missing', async () => {
      tealiumEvents.sendGalleryScrollEvent('propertyId', 3);
      await agentDataPromise;
      expect(window.utag.link).not.toHaveBeenCalled();
    });
  });
});
