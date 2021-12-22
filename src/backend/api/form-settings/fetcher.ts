import { BackendApiFactory } from 'backend/api/factory';
import { FiltersDataInterface } from 'components/filters/data/interface';

import { BackendApiFormSettingsJsonApiResultType } from './json-api-result.type';
import { backendApiFormSettingsMapper } from './mapper';

// TODO-FE[TPNX-3039] implement the caching for this request,
// since we should not request it for every search request
export const backendApiFormSettingsFetcher = ({
  translations,
}: {
  translations?: Record<string, Record<string, string>>;
}): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<FiltersDataInterface, BackendApiFormSettingsJsonApiResultType>({
    method: 'GET',
    url: 'v2/form-settings',
    dataMapper: backendApiFormSettingsMapper(translations || {}),
  });
