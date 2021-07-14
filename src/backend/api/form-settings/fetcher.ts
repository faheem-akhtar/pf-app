import { backendApiFactory } from 'backend/api/backend-factory';
import { backendApiFormSettingsMapper } from './mapper';

import { BackendApiFormSettingJsonApiResultType } from './json-api-result.type';
import { FiltersDataInterface } from 'components/filters/data/interface';

// TODO-FE[TPNX-3039] implement the caching for this request,
// since we should not request it for every search request
export const backendApiFormSettingsFetcher = backendApiFactory<
  FiltersDataInterface,
  BackendApiFormSettingJsonApiResultType
>({
  method: 'GET',
  url: 'form-settings',
  dataMapper: backendApiFormSettingsMapper,
});
