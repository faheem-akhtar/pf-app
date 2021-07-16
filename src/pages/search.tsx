import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PropertySearchComponentPropsType } from 'views/property-search/view-props.type';
import { PropertySearchView } from 'views/property-search/view';

import { backendApiFormSettingsFetcher } from 'backend/api/form-settings/fetcher';
import { backendApiLocationAllFetcher } from 'backend/api/location/all-fetcher';
import { backendApiPropertySearchFetcher } from 'backend/api/property-search/fetcher';
import { filtersQueryToValue } from 'components/filters/query/to-value';

export const getServerSideProps: GetServerSideProps<PropertySearchComponentPropsType> = async (
  context: GetServerSidePropsContext
) => {
  const locale = context.locale as string;

  // TODO-FE[TPNX-3047] consider fetching form-settings during the build
  const formSettingsResult = await backendApiFormSettingsFetcher({
    locale,
  });

  if (!formSettingsResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to fetch the form settings. (${formSettingsResult.error.status}) ${formSettingsResult.error.body}`,
      },
    };
  }

  const filtersData = formSettingsResult.data;

  // TODO-FE[TPNX-3047] consider fetching locations during the build
  const allLocationsResult = await backendApiLocationAllFetcher({ locale });

  if (!allLocationsResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to fetch the locations. (${allLocationsResult.error.status}) ${allLocationsResult.error.body}`,
      },
    };
  }

  const filtersValueFromQuery = filtersQueryToValue(context.query, allLocationsResult.data);

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
      filtersData,
      filtersValueFromQuery,
      searchResult: searchResult.data,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default PropertySearchView;
