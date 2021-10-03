import { StatsDebuggerService } from '@propertyfinder/pf-frontend-common/dist/service/stats-debugger/service';

import { urlQueryGetParameterByName } from 'helpers/url-query/get-parameter-by-name';

import { StatsGuardServiceInterface } from './guard.service.interface';

export const StatsGuardService: StatsGuardServiceInterface = {
  init: () => {
    const isStatsEnabled = !!urlQueryGetParameterByName('trace-stats');
    StatsDebuggerService().activate(isStatsEnabled);
  },
};
