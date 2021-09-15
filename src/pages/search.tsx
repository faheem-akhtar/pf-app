/* eslint-disable pf-rules/export-name-validation */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { PropertySearchView } from 'views/property-search/view';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

import filtersDataByLocale from '../../public/static/filters-data';

// TODO-FE[CX-429] add tests
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

  // eslint-disable-next-line no-console
  console.log('TESTING');

  return {
    props: {
      ok: true,
      filtersData: (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale],
      filtersValueFromQuery,
      searchResult: searchResult.data,
      ...(await backendTranslationGetDefinitions(locale)),
    },
  };
};

export default PropertySearchView;
