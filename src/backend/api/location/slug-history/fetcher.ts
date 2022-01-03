import { BackendApiFactory } from 'backend/api/factory';
import { BackendModelLocationSlugHistoryInterface } from 'backend/model/location/slug-history.interface';
import { LocationSlugHistoryInterface } from 'types/location/slug-history.interface';

import { backendApiLocationSlugHistoryMapper } from './mapper';

export const backendApiLocationSlugHistoryFetcher = ({
  isPrimaryLocale,
}: {
  isPrimaryLocale?: boolean;
}): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<LocationSlugHistoryInterface[], BackendModelLocationSlugHistoryInterface[]>({
    method: 'GET',
    url: 'location-slug-history',
    queryDefaultParams: {
      ['filter[primary_language]']: !!isPrimaryLocale,
    },
    dataMapper: backendApiLocationSlugHistoryMapper,
  });
