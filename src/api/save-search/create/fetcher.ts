import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { ApiSaveSearchCreateRequestInterface } from './request.interface';
import { ApiSaveSearchCreateResponseInterface } from './response.interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { LocaleService } from 'services/locale/service';
import { saveSearchFiltersMapper } from 'components/save-search/filters-mapper';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

const fetcher = ApiAuthRequiredFactory<
  SaveSearchLoadResultInterface,
  ApiSaveSearchCreateResponseInterface,
  ApiJsonModelInterface<ApiSaveSearchCreateRequestInterface>
>({
  method: 'POST',
  url: 'saved-search',
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
