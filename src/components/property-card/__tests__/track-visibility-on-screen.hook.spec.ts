import { mockReactUseContext } from 'mocks/react/use-context.mock';
import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockWindowConsole } from 'mocks/window/console.mock';
import { propertyStub } from 'stubs/property/stub';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { StatsService } from 'services/stats/service';

import { usePropertyCardTrackVisibilityOnScreen } from '../track-visibility-on-screen.hook';

const originalSetInterval = window.setInterval;
const originalClearInterval = window.clearInterval;

describe('usePropertyCardTrackVisibilityOnScreen', () => {
  const statsDataPromise = Promise.resolve({ ok: true });
  const onScreenContainerRef = {
    current: {
      getBoundingClientRect: () => ({
        top: 100,
        height: 200,
        bottom: 300,
      }),
    } as HTMLDivElement,
  };

  const outOffScreenContainerRef = {
    current: {
      getBoundingClientRect: () => ({
        top: -500,
        height: 200,
        bottom: -300,
      }),
    } as HTMLDivElement,
  };

  let fireSetInterval: Function;

  beforeEach(() => {
    (StatsService().propertyImpression as jest.Mock).mockReset();
    mockReactUseEffect();
    mockReactUseContext(5, { value: { [FiltersParametersEnum.pageNumber]: 3 } });
    window.setInterval = ((callback: Function): number => {
      fireSetInterval = callback;
      return 0;
    }) as typeof window.setInterval;
    window.clearInterval = jest.fn();
  });

  afterAll(() => {
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
  });

  it('should fire analytics event after 2 intervals (500ms)', async () => {
    mockWindowConsole();

    usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyStub(), onScreenContainerRef);
    fireSetInterval();
    fireSetInterval();

    await statsDataPromise;

    expect(StatsService().propertyImpression).toHaveBeenCalledTimes(1);
    expect(StatsService().propertyImpression).toHaveBeenCalledWith(198023, {
      pagination: { itemPerPage: 25, itemTotal: 5, pageCurrent: 3 },
    });
    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should not fire analytics event after 2 intervals (500ms) when card is not on screen', async () => {
    usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyStub(), outOffScreenContainerRef);
    fireSetInterval();
    fireSetInterval();

    await statsDataPromise;

    expect(StatsService().propertyImpression).not.toHaveBeenCalled();
    expect(window.clearInterval).toHaveBeenCalledTimes(0);
  });

  it('should clear interval on unmount', async () => {
    const { unmountAll } = mockReactUseEffect();
    usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyStub(), outOffScreenContainerRef);

    unmountAll();

    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should handle the absense of container ref without an error', async () => {
    const { unmountAll } = mockReactUseEffect();
    usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyStub(), { current: null });

    fireSetInterval();
    unmountAll();

    expect(window.clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should report if statsData was failed to load', async () => {
    const statsDataPromise = Promise.resolve({ ok: false });
    mockReactUseEffect();
    usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyStub(), onScreenContainerRef);

    fireSetInterval();
    fireSetInterval();

    const { error: consoleErrorMock } = mockWindowConsole();

    await statsDataPromise;

    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'failed to send listing impression because stats data was not loaded'
    );
  });
});
