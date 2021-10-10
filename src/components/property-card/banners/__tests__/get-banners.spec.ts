/* 
TODO-FE: CX-768
import * as utils from 'common/helper/new-projects-property/get-is-new-property'; 
*/

import { propertyStub } from 'stubs/property/stub';

import * as getLiveEvent from 'components/property/serp/obfuscated/get/live-event-value';
import * as getVerified from 'components/property/serp/obfuscated/get/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

import { propertyCardBannersGetBanners } from '../get-banners';

describe('propertyCardBannersGetBanners', () => {
  let property: PropertySerpObfuscatedType;
  const translationFunctionMock: jest.Mock = jest.fn((text) => text);
  let getVerifiedSpy: jest.SpyInstance;
  let getLiveEventSpy: jest.SpyInstance;

  /*   
  TODO-FE: CX-768
  let newProjectsPropertyGetIsNewPropertySpy: jasmine.Spy; 
  */

  beforeEach(() => {
    property = propertyStub();
    getVerifiedSpy = jest.spyOn(getVerified, 'propertySerpObfuscatedGetVerified');
    getLiveEventSpy = jest.spyOn(getLiveEvent, 'propertySerpObfuscatedGetLiveEventValue');
    /*     
    TODO-FE: CX-768
    newProjectsPropertyGetIsNewPropertySpy = spyOn(utils, 'newProjectsPropertyGetIsNewProperty');
    newProjectsPropertyGetIsNewPropertySpy.and.returnValue(false); 
    */
  });

  it('should return 0 banners', () => {
    getVerifiedSpy.mockReturnValueOnce('');

    expect(propertyCardBannersGetBanners(property, translationFunctionMock).length).toEqual(0);
  });

  it('should have the verified banner', () => {
    const banners = propertyCardBannersGetBanners(property, translationFunctionMock);

    expect(banners.length).toEqual(1);
    expect(banners[0].text).toEqual('Verified');
  });
  /* 
  TODO-FE: CX-768

  it('should have the new constuction banner', () => {
    property.meta.live_event_metadata = null;
    property.new_projects = true;

    const banners = propertyCardBannersGetBanners(property);

    expect(banners.length).toEqual(1);
    expect(banners[0].text).toEqual('New Construction');
  });

  it('should have the "new constuction" and "direct from developer" banners', () => {
    property.meta.live_event_metadata = null;
    property.new_projects = true;
    newProjectsPropertyGetIsNewPropertySpy.and.returnValue(true);

    const banners = propertyCardBannersGetBanners(property);

    expect(banners.length).toEqual(2);
    expect(banners[0].text).toEqual('New Construction');
    expect(banners[1].text).toEqual('Direct from developer');
  });

  */

  it('should have the live viewing banner', () => {
    getVerifiedSpy.mockReturnValueOnce('');
    getLiveEventSpy.mockReturnValueOnce({});

    const banners = propertyCardBannersGetBanners(property, translationFunctionMock);

    expect(banners.length).toEqual(1);
    expect(banners[0].text).toEqual('Live Viewing');
  });

  /* 
  TODO-FE: CX-768
  it('should have only 3 banners', () => {
    property.new_projects = true;
    newProjectsPropertyGetIsNewPropertySpy.and.returnValue(true);
    property.verified = true;

    const banners = propertyCardBannersGetBanners(property);

    expect(banners.length).toEqual(3);
    expect(banners[0].text).toEqual('Verified');
    expect(banners[1].text).toEqual('New Construction');
    expect(banners[2].text).toEqual('Direct from developer');
  });  */
});
