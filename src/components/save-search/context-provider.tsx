import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { apiSaveSearchCreateFetcher } from 'api/save-search/create/fetcher';
import { FiltersContext } from 'components/filters/context';
import { useApiSaveSearch } from 'api/save-search/hook';
import { UserContext } from 'context/user/context';

import { SaveSearchContext } from './context';
import { SaveSearchContextInterface } from './context.interface';
import { saveSearchFilterEquality } from './filter-equality';
import { saveSearchFiltersMapper } from './filters-mapper';
import { SaveSearchLoadResultInterface } from './load-result-interface';

export const SaveSearchContextProvider: FunctionComponent = ({ children }) => {
  const user = useContext(UserContext);
  const saveSearchResponse = useApiSaveSearch();
  const saveSearchResponseData = saveSearchResponse.ok ? saveSearchResponse.data : [];
  const [searches, setSearches] = useState<SaveSearchLoadResultInterface[]>([]);
  const filtersCtx = useContext(FiltersContext);
  const filters = saveSearchFiltersMapper(filtersCtx.value);

  useEffect(() => {
    if (user && saveSearchResponse.ok) {
      setSearches(saveSearchResponseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, saveSearchResponse.ok]);

  const value: SaveSearchContextInterface = {
    data: searches,
    filtered: searches.filter((item) => saveSearchFilterEquality(item.filters, filters)),
    create: ({ name, frequency }) =>
      apiSaveSearchCreateFetcher({ name, frequency, filters: filtersCtx.value }).then((response) => {
        if (response.ok) {
          setSearches([...searches, response.data]);
        }
        return response;
      }),
  };

  return <SaveSearchContext.Provider value={value}>{children}</SaveSearchContext.Provider>;
};