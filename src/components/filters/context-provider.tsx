import { NextRouter, Router, useRouter } from 'next/dist/client/router';

import { filtersValueToQuery } from './value/to-query';
import { urlQuerySerialize } from 'helpers/url-query/serialize';
import { useFiltersValueState } from './value/state.hook';

import { FiltersContext } from './context';
import { FiltersContextInterface } from './context.interface';
import { FiltersContextProviderPropsInterface } from './context-provider-props.interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueInterface } from './value/interface';
import { UrlQueryType } from 'types/url/query.type';
import { useEffect } from 'react';

/**
 * Change browser url path
 */
const navigate = (router: NextRouter, filtersValue: FiltersValueInterface): void => {
  const query = filtersValueToQuery(filtersValue);
  const url = `${router.pathname}?${urlQuerySerialize(query as UrlQueryType)}`;

  if (router.asPath !== url) {
    router.push(url);
  }
};

export const FiltersContextProvider = ({
  filtersValueFromQuery,
  filtersData,
  children,
}: FiltersContextProviderPropsInterface): JSX.Element => {
  const router = useRouter();

  const { filtersValue, changeFiltersValue, setFiltersValue, resetFiltersValue, filtersValueIsDefault } =
    useFiltersValueState(filtersData, filtersValueFromQuery);

  const updateFiltersValue: FiltersContextInterface['change'] = (updater) => {
    const updatedFiltersValue = updater(filtersValue);
    const nextFiltersValue = changeFiltersValue(updatedFiltersValue);
    navigate(router, nextFiltersValue);
    return nextFiltersValue;
  };

  const value = {
    value: filtersValue,
    valueIsDefault: filtersValueIsDefault,
    data: filtersData,
    change: updateFiltersValue,
    set: (nextFiltersValue: FiltersValueInterface): void => {
      setFiltersValue(nextFiltersValue);
      navigate(router, nextFiltersValue);
    },
    reset: (): void => {
      const nextFiltersValue = resetFiltersValue();
      navigate(router, nextFiltersValue);
    },
  };

  useEffect(() => {
    const onRouteChangeComplete = (url: string): void => {
      const queryPage = parseInt(url.match(/page=(\d+)/i)?.[1] || '1', 10);

      if (filtersValue[FiltersParametersEnum.pageNumber] !== queryPage) {
        setFiltersValue({ ...filtersValue, [FiltersParametersEnum.pageNumber]: queryPage });
      }
    };

    Router.events.on('routeChangeComplete', onRouteChangeComplete);

    return (): void => Router.events.off('routeChangeComplete', onRouteChangeComplete);
  });

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
