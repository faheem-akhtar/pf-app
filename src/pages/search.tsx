/* eslint-disable @propertyfinder/rules/export-name-validation */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { performance } from 'perf_hooks';
import filtersDataByLocale from 'public/static/filters-data';

import { backendApiPropertySearchAdFetcher } from 'backend/api/property/search/ad-fetcher';
import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendApiSeoContentFetcher } from 'backend/api/seo/content/fetcher';
import { backendApiSeoLinksFetcher } from 'backend/api/seo/links/fetcher';
import { backendFiltersQueryFromParam } from 'backend/filters/query/from-param';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { backendTranslationQueryToPath } from 'backend/translation/query-to-path';
import { AB_TEST_COOKIE_STORAGE_KEY } from 'components/ab-test/cookie-storage-key.constant';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { PROPERTY_SERP_NO_OF_PRELOAD_IMAGES } from 'components/property/serp/no-of-preload-images.constant';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { SeoDataInterface } from 'components/seo/data.interface';
import { configCacheStrategy } from 'config/cache/strategy';
import { configCommon } from 'config/common';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { PageTypeEnum } from 'enums/page-type/enum';
import { headersDevPatchSetCookieDomain } from 'helpers/headers/dev-patch-set-cookie-domain';
import { headersParseExperimentsFromSetCookie } from 'helpers/headers/parse-experiments-from-set-cookie';
import { localeIsDefault } from 'helpers/locale/is-default';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';
import { promiseAllSettled } from 'helpers/promise/all-settled';
import { PropertySearchView } from 'views/property-search/view';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

export const getServerSideProps: GetServerSideProps<PropertySearchViewPropsType> = async (
  context: GetServerSidePropsContext
) => {
  const locale = context.locale as string;
  const linkHeader: string[] = [];
  const filtersData = (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale];

  const { query, error, redirect } = backendFiltersQueryFromParam(
    objectFilterNonOrEmptyValue(context.query),
    locale,
    `/${locale}${context.req.url}`
  );

  if (error) {
    return {
      notFound: true,
    };
  }

  if (redirect) {
    return { redirect };
  }

  const isFirstPage = !query.page || query.page === '1';
  const isSecondPage = query.page === '2';
  const isSortByFeatured = !query[FiltersQueryParametersEnum.sort] || query[FiltersQueryParametersEnum.sort] === 'mr';

  const isLandingPage = 'pattern' in query;

  const filtersValueFromQuery = backendFiltersQueryToValue(query, locale);

  const apiRequestStartTime = performance.now();

  const [searchResult, searchAdResult, serverSideTranslations, seoLinks, seoContent] = await promiseAllSettled([
    backendApiPropertySearchFetcher(
      locale,
      filtersValueFromQuery,
      context.req.cookies[AB_TEST_COOKIE_STORAGE_KEY],
      context.req.headers['user-agent'] as string
    ),

    // Only fetch ads for 1st & 2nd pages and when result is sort by featured
    (isFirstPage || isSecondPage) && isSortByFeatured
      ? backendApiPropertySearchAdFetcher(
          locale,
          filtersValueFromQuery,
          context.req.cookies[AB_TEST_COOKIE_STORAGE_KEY],
          context.req.headers['user-agent'] as string
        )
      : null,

    backendTranslationGetDefinitions(locale),

    // Includes 'pattern' if it is landing pages' route
    isLandingPage ? backendApiSeoLinksFetcher(locale, context.query) : null,

    // Only fetch seo content for 1st landing page
    isLandingPage && isFirstPage ? backendApiSeoContentFetcher(locale, `/${locale}${context.req.url}`) : null,
  ]);

  // eslint-disable-next-line no-console
  console.log(`SEARCH_API_CALLS:${Math.round(performance.now() - apiRequestStartTime)}:${context.req.url}`);

  if (!searchResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to search. (${searchResult.error.status}) ${searchResult.error.body}`,
      },
    };
  }

  const searchAdResultProperties = (searchAdResult?.ok && searchAdResult.data.properties) || [];

  // insert ads at the start
  searchResult.data.properties = searchAdResultProperties.concat(searchResult.data.properties);

  const seoData: SeoDataInterface = {
    ...(seoLinks?.ok && seoLinks.data),
    ...(seoContent?.ok && seoContent.data && { content: seoContent.data }),
  };

  const alternateUrl =
    backendTranslationQueryToPath(
      context.query,
      locale as string,
      localeIsDefault(locale as string) ? configCommon.language.alternative : configCommon.language.current
    ) || '';

  searchResult.data.properties.slice(0, PROPERTY_SERP_NO_OF_PRELOAD_IMAGES).map((property) => {
    const imgUrl = propertySerpObfuscatedGetImgUrl(property);
    if (imgUrl) {
      linkHeader.push(`<${imgUrl.replace(/\.jpg\b/, '.webp')}>; rel="preload"; as="image"`);
    }
  });

  // Set Headers
  context.res.setHeader('set-cookie', headersDevPatchSetCookieDomain(searchResult.headers.get('set-cookie') || ''));

  if (linkHeader.length) {
    context.res.setHeader('Link', linkHeader.join(', '));
  }

  if (!searchAdResultProperties.length) {
    // set up a 30mins cache for pages without cts or smart ads.
    context.res.setHeader('cache-control', `max-age=${configCacheStrategy.shortTerm}`);
  }

  return {
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
      alternateUrl,
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
