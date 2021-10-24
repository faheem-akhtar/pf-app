import { useEffect, useRef } from 'react';

import { configAdsGptUnits } from 'config/ads/gpt/units';
import { AdConfigInterface } from 'types/ad/config.interface';

import { DfpAdService } from './ad-service';

export const useServicesDfpAds = (adConfig: AdConfigInterface): void => {
  const dfpAdServiceRef = useRef<DfpAdService>();

  useEffect(() => {
    if (!configAdsGptUnits.length) {
      return;
    }

    if (!dfpAdServiceRef.current) {
      dfpAdServiceRef.current = new DfpAdService(adConfig);
    }

    dfpAdServiceRef.current?.setTargeting(adConfig.ad_targeting);
    dfpAdServiceRef.current?.refreshAllAds();
  }, [adConfig]);
};
