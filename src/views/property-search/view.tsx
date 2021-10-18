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
import { PropertyListHeadingComponent } from 'components/property/list/heading/component';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchNotFoundSectionTemplate } from 'components/property-search-not-found-section/template';
import { SavedPropertyContextProvider } from 'components/saved-property/context-provider';
import { SnackbarContextProvider } from 'components/snackbar/context-provider';
import { WrapperTemplate } from 'components/wrapper/template';
import { usePageIsLoading } from 'helpers/page/is-loading.hook';
import { useReactConstructor } from 'helpers/react/constructor.hook';
import { usePrevious } from 'hooks/previous.hook';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';
import { useServicesTealiumSearch } from 'services/tealium/search.hook';

import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from './stats-data-promise-for-current-query/context';
import { usePropertySearchTrackPageView } from './track-page-view.hook';
import { PropertySearchViewPropsType } from './view-props.type';

// TODO-FE[CX-433] add tests
export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const prevProps = usePrevious(props);
  const { statsDataPromise } = usePropertySearchTrackPageView(prevProps, props);
  const pageIsLoading = usePageIsLoading();

  useReactConstructor(() => {
    if (props.ok) {
      abTestTracker.load(props.abTests);
    }
  });
  useServicesTealiumSearch(props);

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  const { filtersValueFromQuery, filtersData } = props;
  const filtersContextProps = { filtersValueFromQuery, filtersData };

  return (
    <PropertySearchStatsDataPromiseForCurrentQueryContext.Provider value={statsDataPromise}>
      <PropertySearchResultsCountForCurrentQueryContext.Provider value={props.searchResult.total}>
        <SnackbarContextProvider>
          <HeadComponent
            pageTitle={props.documentTitle}
            // TODO-FE[CX-708] The page should be indexable for landing pages. Implement it once landing pages are served by pf-web-app
            shouldIndex={false}
          />
          <FiltersContextProvider {...filtersContextProps}>
            <SavedPropertyContextProvider>
              <ContactedPropertyContextProvider>
                <HeaderComponent />
                <FiltersSectionComponent />
                <PropertyListHeadingComponent pageTitle={props.documentTitle} />
                <WrapperTemplate>
                  {props.searchResult.total ? (
                    <Fragment>
                      <PropertySearchCountAndSortSectionComponent
                        loading={pageIsLoading}
                        count={props.searchResult.total}
                      />
                      <PropertyListComponent
                        properties={props.searchResult.properties}
                        adConfig={props.searchResult.adConfig}
                        pageIsLoading={pageIsLoading}
                      />
                      <PaginationSectionComponent pagesAvailable={props.searchResult.pages} loading={pageIsLoading} />
                    </Fragment>
                  ) : (
                    <PropertySearchNotFoundSectionTemplate />
                  )}
                </WrapperTemplate>
              </ContactedPropertyContextProvider>
            </SavedPropertyContextProvider>
            <MapSearchButtonComponent />
            <FooterComponent onClickAppDownload={AnalyticsTealiumService.onAppDownloadClicked} />
          </FiltersContextProvider>
        </SnackbarContextProvider>
      </PropertySearchResultsCountForCurrentQueryContext.Provider>
    </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
  );
};
