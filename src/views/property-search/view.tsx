import { Fragment } from 'react';
import { usePrevious } from 'src/hooks/previous.hook';

import { ContactedPropertyContextProvider } from 'components/contacted-property/context-provider';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersSectionComponent } from 'components/filters-section/component';
import { FooterComponent } from 'components/footer/component';
import { HeadComponent } from 'components/head/component';
import { HeaderComponent } from 'components/header/component';
import { MapSearchButtonComponent } from 'components/map-search/button/component';
import { PaginationSectionComponent } from 'components/pagination-section/component';
import { PropertyListComponent } from 'components/property/list/component';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchNotFoundSectionTemplate } from 'components/property-search-not-found-section/template';
import { SavedPropertyContextProvider } from 'components/saved-property/context-provider';
import { SnackbarContextProvider } from 'components/snackbar/context-provider';
import { WrapperTemplate } from 'components/wrapper/template';
import { usePageIsLoading } from 'helpers/page/is-loading.hook';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';
import { TealiumEventEnum } from 'services/tealium/event.enum';
import { TealiumEventActionEnum } from 'services/tealium/event-action.enum';
import { TealiumEventCategoryEnum } from 'services/tealium/event-category.enum';
import { TealiumEventLabelEnum } from 'services/tealium/event-label.enum';
import { TealiumEventTypeEnum } from 'services/tealium/event-type.enum';

import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from './stats-data-promise-for-current-query/context';
import { usePropertySearchTrackPageView } from './track-page-view.hook';
import { PropertySearchViewPropsType } from './view-props.type';

// TODO-FE[CX-433] add tests
export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const prevProps = usePrevious(props);
  const { statsDataPromise } = usePropertySearchTrackPageView(prevProps, props);
  const pageIsLoading = usePageIsLoading();

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
            <FooterComponent
              onClickAppDownload={(): void => {
                AnalyticsTealiumService.link({
                  tealium_event: TealiumEventEnum.appDownload,
                  event_category: TealiumEventCategoryEnum.productFeature,
                  event_type: TealiumEventTypeEnum.click,
                  event_action: TealiumEventActionEnum.app,
                  event_label: TealiumEventLabelEnum.download,
                });
              }}
            />
          </FiltersContextProvider>
        </SnackbarContextProvider>
      </PropertySearchResultsCountForCurrentQueryContext.Provider>
    </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
  );
};
