import { AdConfigMock } from 'mocks/ad-config/mock';
import { DfpAdService } from '../ad-service';

import { reactMockUseEffect } from 'mocks/react/mock-use-effect';
import { reactMockUseRef } from 'mocks/react/mock-use-ref';
import { useServicesDfpAds } from '../ads.hook';

describe('useServicesDfpAds', () => {
  it('should set the ref to DfpAdService when ref is empty', () => {
    reactMockUseEffect();
    const dfdServiceRef = reactMockUseRef<DfpAdService>();
    useServicesDfpAds(AdConfigMock());

    expect(typeof dfdServiceRef.current.refreshAllAds).toBe('function');
  });

  it('should keep previous service reference when ref is set', () => {
    reactMockUseEffect();
    const service = new DfpAdService(AdConfigMock());
    const dfdServiceRef = reactMockUseRef<DfpAdService>(service);
    useServicesDfpAds(AdConfigMock());

    expect(dfdServiceRef.current).toBe(service);
  });
});
