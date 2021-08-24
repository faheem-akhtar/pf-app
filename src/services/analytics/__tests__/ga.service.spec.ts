import { AnalyticsGaService } from '../ga.service';

describe('AnalyticsGaService', () => {
  let dataLayerMock;

  beforeEach(() => {
    dataLayerMock = (global as unknown as { dataLayer: { push: jest.Mock } }).dataLayer = { push: jest.fn() };
  });

  it('can send event to GA', () => {
    const event = {};
    AnalyticsGaService.send(event);
    expect(dataLayerMock.push).toHaveBeenCalledWith(event);
  });
});
