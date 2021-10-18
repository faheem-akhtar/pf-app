import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { saveSearchFiltersMapper } from 'components/save-search/filters-mapper';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { LocaleService } from 'services/locale/service';

import { ApiSaveSearchCreateRequestInterface } from './request.interface';

const fetcher = ApiAuthRequiredFactory<
  SaveSearchLoadResultInterface,
  SaveSearchLoadResultInterface[],
  ApiJsonModelInterface<ApiSaveSearchCreateRequestInterface>
>({
  method: 'POST',
  url: 'saved-search',
  handledByPfWebApp: true,
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  dataMapper: (data) => data[0],
});

export const apiSaveSearchCreateFetcher = (requestParams: {
  name: string;
  frequency: SaveSearchFrequencyEnum;
  filters: FiltersValueInterface;
}): Promise<ApiFetcherResultType<SaveSearchLoadResultInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'saved_search',
        attributes: {
          name: requestParams.name,
          frequency: requestParams.frequency,
          filters: saveSearchFiltersMapper(requestParams.filters),
        },
      },
    },
  });
};
