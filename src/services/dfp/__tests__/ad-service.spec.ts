import * as Googletag from 'Googletag';

import { mockWindowImportScript } from 'mocks/window/import-script.mock';

import { adConfigStub } from 'stubs/ad/config.stub';
import { AdUnitInterface } from 'types/ad/unit.interface';
import { DfpAdService } from '../ad-service';

describe('DfpAdService', () => {
  it('should load gpt tag in constructor', () => {
    const importScriptMock = mockWindowImportScript();
    new DfpAdService(adConfigStub());

    expect(importScriptMock.spy).toHaveBeenCalledWith('https://securepubads.g.doubleclick.net/tag/js/gpt.js');
  });

  it('should enable pubads', async () => {
    const importScriptMock = mockWindowImportScript();
    const service = new DfpAdService(adConfigStub());

    await importScriptMock.promise;

    expect(service['googletag'].cmd.length).toEqual(4);

    const addServiceMock = jest.fn();
    const slotMock = { addService: addServiceMock };
    service['googletag'].defineSlot = jest.fn().mockReturnValue(slotMock);
    const pubadsMock = {
      collapseEmptyDivs: jest.fn(),
      enableSingleRequest: jest.fn(),
      enableLazyLoad: jest.fn(),
    };
    service['googletag'].pubads = jest.fn().mockReturnValue(pubadsMock);
    service['googletag'].enableServices = jest.fn();
    service['googletag'].cmd.forEach((fn) => fn());

    expect(service['googletag'].enableServices).toHaveBeenCalledTimes(1);
    expect(pubadsMock.collapseEmptyDivs).toHaveBeenCalledTimes(1);
    expect(pubadsMock.enableSingleRequest).toHaveBeenCalledTimes(1);
    expect(pubadsMock.enableLazyLoad).toHaveBeenCalledTimes(1);
    expect(pubadsMock.enableLazyLoad).toHaveBeenCalledWith({
      fetchMarginPercent: 30,
      renderMarginPercent: 30,
    });
  });

  it('should refresh all ads on refreshAllAds()', async () => {
    const importScriptMock = mockWindowImportScript();
    const service = new DfpAdService(adConfigStub());

    await importScriptMock.promise;
    service['googletag'].cmd.length = 0;

    const pubadsMock = {
      refresh: jest.fn(),
    };
    service['googletag'].pubads = jest.fn().mockReturnValue(pubadsMock);

    service.refreshAllAds();
    await importScriptMock.promise;

    service['googletag'].cmd.forEach((fn) => fn());

    expect(pubadsMock.refresh).toHaveBeenCalledTimes(1);
  });

  it('should set pubads targetting on setTargeting()', async () => {
    const importScriptMock = mockWindowImportScript();
    const service = new DfpAdService(adConfigStub());

    await importScriptMock.promise;
    service['googletag'].cmd.length = 0;

    const pubadsMock = {
      clearTargeting: jest.fn(),
      setTargeting: jest.fn(),
    };

    service['googletag'].pubads = jest.fn().mockReturnValue(pubadsMock);

    service.setTargeting({ Language: ['en'] });
    await importScriptMock.promise;

    service['googletag'].cmd.forEach((fn) => fn());

    //expect(pubadsMock.clearTargeting).toHaveBeenCalledTimes(1)
    expect(pubadsMock.setTargeting).toHaveBeenCalledTimes(1);
    expect(pubadsMock.setTargeting).toHaveBeenCalledWith('Language', ['en']);
  });

  it('should call clearTargetting is targeting is set on setTargeting()', async () => {
    const importScriptMock = mockWindowImportScript();
    const service = new DfpAdService(adConfigStub());

    await importScriptMock.promise;
    service['googletag'].cmd.length = 0;

    const pubadsMock = {
      clearTargeting: jest.fn(),
      setTargeting: jest.fn(),
    };
    service['targeting'] = {};
    service['googletag'].pubads = jest.fn().mockReturnValue(pubadsMock);

    service.setTargeting({ Language: ['en'] });
    await importScriptMock.promise;

    service['googletag'].cmd.forEach((fn) => fn());

    expect(pubadsMock.clearTargeting).toHaveBeenCalledTimes(1);
  });

  it('should return existing slot on createAdSlot() if defined', () => {
    const service = new DfpAdService(adConfigStub());

    service['adSlots'] = { container: {} as Googletag.Slot };
    const result = service['createAdSlot']({} as AdUnitInterface, 'container');

    expect(result).toBe(service['adSlots'].container);
  });

  it('should call defineSlot on createAdSlot()', () => {
    const service = new DfpAdService(adConfigStub());

    const slotMock = { defineSizeMapping: jest.fn(), addService: jest.fn() };
    const addSizeMock = jest.fn();
    addSizeMock.mockReturnValue({ addSize: () => ({ build: jest.fn() }) });

    const sizeMappingMock = jest.fn().mockReturnValue({ addSize: addSizeMock });
    const defineSlotMock = jest.fn().mockReturnValue(slotMock);
    service['googletag'] = {
      sizeMapping: sizeMappingMock,
      pubads: () => ({}),
      defineSlot: defineSlotMock,
    } as unknown as Googletag.Googletag;
    service['createAdSlot'](
      { id: 'id', size: [{ viewportWidth: 100 }, { viewportWidth: 100 }] } as AdUnitInterface,
      'container'
    );

    expect(sizeMappingMock).toHaveBeenCalledTimes(1);
    expect(defineSlotMock).toHaveBeenCalledWith(
      '/11123073/id',
      [
        [0, 0],
        [0, 0],
      ],
      'container'
    );
  });
});
