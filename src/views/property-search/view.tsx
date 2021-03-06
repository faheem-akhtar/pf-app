import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { abTestTracker } from 'components/ab-test/tracker';
import { ContactedPropertyContextProvider } from 'components/contacted-property/context-provider';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersSectionComponent } from 'components/filters-section/component';
import { FooterComponent } from 'components/footer/component';
import { HeadComponent } from 'components/head/component';
import { HeaderComponent } from 'components/header/component';
import { MapSearchButtonComponent } from 'components/map-search/button/component';
import { PaginationSectionComponent } from 'components/pagination-section/component';
import { PropertyListComponent } from 'components/property/list/component';
import { PropertyListHeaderComponent } from 'components/property/list/header/component';
import { propertySerpNextPageUrl } from 'components/property/serp/next-page-url';
import { propertySerpPreviousPageUrl } from 'components/property/serp/previous-page-url';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchNotFoundSectionComponent } from 'components/property-search-not-found-section/component';
import { SavedPropertyContextProvider } from 'components/saved-property/context-provider';
import { SeoComponent } from 'components/seo/component';
import { seoReplaceTags } from 'components/seo/replace-tags';
import { SeoTagEnum } from 'components/seo/tag.enum';
import { SnackbarContextProvider } from 'components/snackbar/context-provider';
import { WrapperTemplate } from 'components/wrapper/template';
import { configCommon } from 'config/common';
import { mapSearchEnabledByDefault } from 'config/map-search/enabled-by-default';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { helpersIsClient } from 'helpers/is-client';
import { localeGetLangAwareHref } from 'helpers/locale/get-lang-aware-href';
import { localeIsDefault } from 'helpers/locale/is-default';
import { usePageIsLoading } from 'helpers/page/is-loading.hook';
import { useReactConstructor } from 'helpers/react/constructor.hook';
import { usePrevious } from 'hooks/previous.hook';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';
import { LocationService } from 'services/location/service';
import { useServicesTealiumSearch } from 'services/tealium/search.hook';

import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from './stats-data-promise-for-current-query/context';
import { usePropertySearchTrackPageView } from './track-page-view.hook';
import { PropertySearchViewPropsType } from './view-props.type';

// TODO-FE[CX-433] add tests
export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const prevProps = usePrevious(props);
  const { query, asPath, locale } = useRouter();
  const targetLocale = localeIsDefault(locale as string)
    ? configCommon.language.alternative
    : configCommon.language.current;
  const { statsDataPromise } = usePropertySearchTrackPageView(prevProps, props);
  const pageIsLoading = usePageIsLoading();

  useReactConstructor(() => {
    if (props.ok) {
      if (helpersIsClient) {
        LocationService.init((locale || LanguageCodeEnum.en) as LanguageCodeEnum);
      }
      abTestTracker.load(props.abTests);
    }
  });
  useServicesTealiumSearch(props);

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  GoogleRecaptchaService().setSiteKey(props.env.recaptchaKey);

  const { filtersValueFromQuery, filtersData } = props;
  const filtersContextProps = { filtersValueFromQuery, filtersData };
  const pageUrl = localeGetLangAwareHref(locale as string, asPath);

  const seoTagsData = { [SeoTagEnum.numberOfListings]: props.searchResult.total.toString() };
  const pageTitle = seoReplaceTags(props.seoData?.content?.title || props.meta.title, seoTagsData);
  const pageDescription = seoReplaceTags(props.seoData?.content?.description || props.meta.description, seoTagsData);

  return (
    <PropertySearchStatsDataPromiseForCurrentQueryContext.Provider value={statsDataPromise}>
      <PropertySearchResultsCountForCurrentQueryContext.Provider value={props.searchResult.total}>
        <SnackbarContextProvider>
          <HeadComponent
            title={pageTitle}
            description={pageDescription}
            schema={props.meta.schema}
            shouldIndex={props.meta.shouldIndex}
            snowplowHost={props.env.snowplowHost}
            pageUrl={pageUrl}
            alternateUrl={query.pattern && localeGetLangAwareHref(targetLocale, props.alternateUrl)}
            pageNextUrl={propertySerpNextPageUrl(pageUrl, props.searchResult.pages)}
            pagePreviousUrl={propertySerpPreviousPageUrl(pageUrl)}
          />
          <FiltersContextProvider {...filtersContextProps}>
            <SavedPropertyContextProvider>
              <ContactedPropertyContextProvider>
                <HeaderComponent alternateUrl={props.alternateUrl} />
                <FiltersSectionComponent />
                <PropertyListHeaderComponent
                  pageTitle={props.meta.title}
                  breadcrumbs={props.searchResult.breadcrumbs}
                />
                {props.searchResult.properties.length > 0 ? (
                  <Fragment>
                    <WrapperTemplate>
                      <PropertySearchCountAndSortSectionComponent
                        loading={pageIsLoading}
                        count={props.searchResult.total}
                      />
                    </WrapperTemplate>
                    <PropertyListComponent
                      properties={props.searchResult.properties}
                      adConfig={props.searchResult.adConfig}
                      pageIsLoading={pageIsLoading}
                    />
                    <WrapperTemplate>
                      <PaginationSectionComponent pagesAvailable={props.searchResult.pages} loading={pageIsLoading} />
                    </WrapperTemplate>
                  </Fragment>
                ) : (
                  <PropertySearchNotFoundSectionComponent />
                )}
              </ContactedPropertyContextProvider>
            </SavedPropertyContextProvider>
            {mapSearchEnabledByDefault && <MapSearchButtonComponent />}
            {props.seoData && <SeoComponent {...props.seoData} />}
            <FooterComponent onClickAppDownload={AnalyticsTealiumService().onAppDownloadClicked} />
          </FiltersContextProvider>
        </SnackbarContextProvider>
      </PropertySearchResultsCountForCurrentQueryContext.Provider>
    </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
  );
};
