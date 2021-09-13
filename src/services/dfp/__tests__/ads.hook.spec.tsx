import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseRef } from 'mocks/react/use-ref.mock';
import { adConfigStub } from 'stubs/ad/config.stub';

import { DfpAdService } from '../ad-service';
import { useServicesDfpAds } from '../ads.hook';

describe('useServicesDfpAds', () => {
  it('should set the ref to DfpAdService when ref is empty', () => {
    mockReactUseEffect();
    const dfdServiceRef = mockReactUseRef<DfpAdService>();
    useServicesDfpAds(adConfigStub());

    expect(typeof dfdServiceRef.current.refreshAllAds).toBe('function');
  });

  it('should keep previous service reference when ref is set', () => {
    mockReactUseEffect();
    const service = new DfpAdService(adConfigStub());
    const dfdServiceRef = mockReactUseRef<DfpAdService>(service);
    useServicesDfpAds(adConfigStub());

    expect(dfdServiceRef.current).toBe(service);
  });
});
