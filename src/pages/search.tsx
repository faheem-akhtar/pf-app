/* eslint-disable pf-rules/export-name-validation */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import filtersDataByLocale from '../../public/static/filters-data';

import { FiltersDataInterface } from 'components/filters/data/interface';
import { PropertySearchView } from 'views/property-search/view';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';
import { translationGetDefinitions } from 'helpers/translation/get-definitions';

export const getServerSideProps: GetServerSideProps<PropertySearchViewPropsType> = async (
  context: GetServerSidePropsContext
) => {
  const locale = context.locale as string;

  const filtersValueFromQuery = backendFiltersQueryToValue(context.query, locale);

  const searchResult = await backendApiPropertySearchFetcher(locale, filtersValueFromQuery);

  if (!searchResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to search. (${searchResult.error.status}) ${searchResult.error.body}`,
      },
    };
  }

  return {
    props: {
      ok: true,
      filtersData: (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale],
      filtersValueFromQuery,
      searchResult: searchResult.data,
      ...(await translationGetDefinitions(locale)),
    },
  };
};

export default PropertySearchView;
