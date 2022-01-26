import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { apiSaveSearchCreateFetcher } from 'api/save-search/create/fetcher';
import { useApiSaveSearch } from 'api/save-search/hook';
import { FiltersContext } from 'components/filters/context';
import { UserContext } from 'components/user/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { SaveSearchContext } from './context';
import { SaveSearchContextInterface } from './context.interface';
import { saveSearchFilterEquality } from './filter-equality';
import { saveSearchFiltersMapper } from './filters-mapper';
import { SaveSearchInterface } from './interface';
import { saveSearchTracker } from './tracker';

export const SaveSearchContextProvider: FunctionComponent = ({ children }) => {
  const user = useContext(UserContext);
  const saveSearchResponse = useApiSaveSearch();
  const saveSearchResponseData = saveSearchResponse.ok ? saveSearchResponse.data : [];
  const [searches, setSearches] = useState<SaveSearchInterface[]>([]);
  const filtersCtx = useContext(FiltersContext);
  const filters = saveSearchFiltersMapper(filtersCtx?.value || {});

  useEffect(() => {
    if (user && saveSearchResponse.ok) {
      setSearches(saveSearchResponseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, saveSearchResponse.ok]);

  const value: SaveSearchContextInterface = {
    ok: saveSearchResponse.ok,
    data: searches,
    filtered: searches.filter((item) => saveSearchFilterEquality(item.filters, filters)),
    create: ({ name, frequency }) =>
      apiSaveSearchCreateFetcher({ name, frequency, filters: filtersCtx.value }).then((response) => {
        if (response.ok) {
          setSearches([...searches, response.data]);
          saveSearchTracker.onCreateSuccess(
            filtersCtx.value[FiltersParametersEnum.locationsIds].map((location) => location.id)
          );
        }
        return response;
      }),
  };

  return <SaveSearchContext.Provider value={value}>{children}</SaveSearchContext.Provider>;
};
