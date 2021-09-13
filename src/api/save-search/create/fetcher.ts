import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { saveSearchFiltersMapper } from 'components/save-search/filters-mapper';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { LocaleService } from 'services/locale/service';

import { ApiSaveSearchCreateRequestInterface } from './request.interface';
import { ApiSaveSearchCreateResponseInterface } from './response.interface';

const fetcher = ApiAuthRequiredFactory<
  SaveSearchLoadResultInterface,
  ApiSaveSearchCreateResponseInterface,
  ApiJsonModelInterface<ApiSaveSearchCreateRequestInterface>
>({
  method: 'POST',
  url: 'saved-search',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  dataMapper: ({ data }) => ({
    id: data.id,
    name: data.attributes.name,
    frequency: data.attributes.frequency,
    filters: data.attributes.filters,
    formatted_filters: data.attributes.formatted_filters,
  }),
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
