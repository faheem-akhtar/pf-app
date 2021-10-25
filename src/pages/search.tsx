/* eslint-disable pf-rules/export-name-validation */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { cookieAbTestKey } from 'constants/cookie/ab-test-key';
import { PageTypeEnum } from 'enums/page-type/enum';
import { headersDevPatchSetCookieDomain } from 'helpers/headers/dev-patch-set-cookie-domain';
import { headersParseExperimentsFromSetCookie } from 'helpers/headers/parse-experiments-from-set-cookie';
import { PropertySearchView } from 'views/property-search/view';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

import filtersDataByLocale from '../../public/static/filters-data';

export const getServerSideProps: GetServerSideProps<PropertySearchViewPropsType> = async (
  context: GetServerSidePropsContext
) => {
  const locale = context.locale as string;

  const filtersValueFromQuery = backendFiltersQueryToValue(context.query, locale);

  const searchResult = await backendApiPropertySearchFetcher(
    locale,
    filtersValueFromQuery,
    context.req.cookies[cookieAbTestKey],
    context.req.headers['user-agent'] as string
  );

  if (!searchResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to search. (${searchResult.error.status}) ${searchResult.error.body}`,
      },
    };
  }

  context.res.setHeader('set-cookie', headersDevPatchSetCookieDomain(searchResult.headers.get('set-cookie') || ''));

  return {
    props: {
      ok: true,
      filtersData: (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale],
      filtersValueFromQuery,
      searchResult: searchResult.data,
      documentTitle: searchResult.data.title,
      ...(await backendTranslationGetDefinitions(locale)),
      pageType: PageTypeEnum.propertySerp,
      abTests: headersParseExperimentsFromSetCookie(searchResult.headers.get('set-cookie') || ''),
      env: {
        recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA as string,
        snowplowHost: process.env.NEXT_PUBLIC_SNOWPLOW_HOST as string,
      },
    },
  };
};

export default PropertySearchView;
