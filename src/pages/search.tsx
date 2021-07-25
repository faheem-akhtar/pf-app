import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { backendApiPropertySearchFetcher } from 'backend/api/property-search/fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import filtersDataByLocale from '../../public/static/filters-data';

import { FiltersDataInterface } from 'components/filters/data/interface';
import { PropertySearchComponentPropsType } from 'views/property-search/view-props.type';
import { PropertySearchView } from 'views/property-search/view';

export const getServerSideProps: GetServerSideProps<PropertySearchComponentPropsType> = async (
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
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default PropertySearchView;
