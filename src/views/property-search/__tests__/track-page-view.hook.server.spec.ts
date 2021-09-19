import * as helpersIsClientModule from 'helpers/is-client';
import * as statsServiceModule from 'services/stats/service';

import { usePropertySearchTrackPageView } from '../track-page-view.hook';
import { PropertySearchViewPropsType } from '../view-props.type';

Object.defineProperty(helpersIsClientModule, 'helpersIsClient', { value: false });

describe('usePropertySearchTrackPageView on server', () => {
  it('should do nothing event if load is sucess', () => {
    usePropertySearchTrackPageView(undefined, {
      ok: true,
    } as PropertySearchViewPropsType);

    const statsService = jest.spyOn(statsServiceModule, 'StatsService');

    expect(statsService).not.toHaveBeenCalled();
  });
});
