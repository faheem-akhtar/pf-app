import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseRef } from 'mocks/react/use-ref.mock';
import { adConfigStub } from 'stubs/ad/config.stub';

import { DfpAdService } from '../ad-service';
import { useServicesDfpAds } from '../ads.hook';

jest.mock('config/ads/gpt/units', () => {
  return {
    configAdsGptUnits: [],
  };
});

describe('useServicesDfpAds', () => {
  it('should not create DfpAdService if ads are empty', () => {
    mockReactUseEffect();
    const dfdServiceRef = mockReactUseRef<DfpAdService>();
    useServicesDfpAds(adConfigStub());

    expect(dfdServiceRef.current).toBeUndefined();
  });
});
