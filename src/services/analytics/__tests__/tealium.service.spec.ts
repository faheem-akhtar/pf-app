import { AnalyticsTealium } from '../tealium';
import { AnalyticsTealiumService } from '../tealium.service';

describe('AnalyticsTealiumService', () => {
  it('should return tealium analytics object', () => {
    expect(AnalyticsTealiumService()).toBeInstanceOf(AnalyticsTealium);
  });
});
