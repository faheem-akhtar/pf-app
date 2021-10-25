import { AnalyticsTealium } from './tealium';

const analyticsTealiumService = new AnalyticsTealium();

export const AnalyticsTealiumService = (): AnalyticsTealium => {
  return analyticsTealiumService;
};
