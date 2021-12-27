/* eslint-disable pf-rules/export-name-validation */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendApiSeoContentFetcher } from 'backend/api/seo/content/fetcher';
import { backendApiSeoLinksFetcher } from 'backend/api/seo/links/fetcher';
import { backendFiltersQueryFromParam } from 'backend/filters/query/from-param';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { SeoDataInterface } from 'components/seo/data.interface';
import { cookieAbTestKey } from 'constants/cookie/ab-test-key';
import { propertySerpNoOfPreloadImages } from 'constants/property/serp/no-of-preload-images';
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
  const linkHeader: string[] = [];
  const filtersData = (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale];

  const { query, error, redirect } = backendFiltersQueryFromParam(
    context.query,
    locale,
    `/${locale}${context.req.url}`
  );

  const isLandingPage = 'pattern' in query;

  const filtersValueFromQuery = backendFiltersQueryToValue(query, locale);

  const [searchResult, serverSideTranslations, seoLinks, seoContent] = await Promise.all([
    backendApiPropertySearchFetcher(
      locale,
      filtersValueFromQuery,
      context.req.cookies[cookieAbTestKey],
      context.req.headers['user-agent'] as string
    ),
    backendTranslationGetDefinitions(locale),

    // Includes 'pattern' if it is landing pages' route
    isLandingPage ? backendApiSeoLinksFetcher(locale, context.query) : null,

    // Only fetch seo content for 1st landing page
    isLandingPage && (!query.page || query.page === '1')
      ? backendApiSeoContentFetcher(locale, `/${locale}${context.req.url}`)
      : null,
  ]);

  if (!searchResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to search. (${searchResult.error.status}) ${searchResult.error.body}`,
      },
    };
  }

  if (redirect) {
    return { redirect };
  }

  const seoData: SeoDataInterface = {
    ...(seoLinks?.ok && seoLinks.data),
    ...(seoContent?.ok && seoContent.data && { content: seoContent.data }),
  };

  searchResult.data.properties.slice(0, propertySerpNoOfPreloadImages).map((property) => {
    const imgUrl = propertySerpObfuscatedGetImgUrl(property);
    if (imgUrl) {
      linkHeader.push(`<${imgUrl.replace(/\.jpg\b/, '.webp')}>; rel="preload"; as="image"`);
    }
  });

  context.res.setHeader('set-cookie', headersDevPatchSetCookieDomain(searchResult.headers.get('set-cookie') || ''));

  if (linkHeader.length) {
    context.res.setHeader('Link', linkHeader.join(', '));
  }

  return {
    notFound: error,
    props: {
      ok: true,
      filtersData,
      filtersValueFromQuery,
      searchResult: searchResult.data,
      breadcrumbs: searchResult.data.breadcrumbs,
      ...serverSideTranslations,
      pageType: PageTypeEnum.propertySerp,
      abTests: headersParseExperimentsFromSetCookie(searchResult.headers.get('set-cookie') || ''),
      meta: {
        title: searchResult.data.title,
        description: searchResult.data.description,
        shouldIndex: !!query.pattern,
        schema: searchResult.data.schema,
      },
      env: {
        recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA as string,
        snowplowHost: process.env.NEXT_PUBLIC_SNOWPLOW_HOST as string,
      },
      ...(Object.keys(seoData).length && {
        seoData,
      }),
    },
  };
};

export default PropertySearchView;
