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
import { usePageIsLoading } from 'helpers/page/is-loading.hook';

import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { usePropertySearchTrackPageView } from './track-page-view.hook';
import { PropertySearchViewPropsType } from './view-props.type';

// TODO-FE[CX-433] add tests
export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const prevProps = usePrevious(props);
  usePropertySearchTrackPageView(prevProps, props);
  const pageIsLoading = usePageIsLoading();

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  const { filtersValueFromQuery, filtersData } = props;
  const filtersContextProps = { filtersValueFromQuery, filtersData };

  return (
    <PropertySearchResultsCountForCurrentQueryContext.Provider value={props.searchResult.total}>
      <SnackbarContextProvider>
        <HeadComponent pageTitle={'TODO-FE[CX-396]'} />
        <FiltersContextProvider {...filtersContextProps}>
          <SavedPropertyContextProvider>
            <ContactedPropertyContextProvider>
              <HeaderComponent />
              <FiltersSectionComponent />
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
            </ContactedPropertyContextProvider>
          </SavedPropertyContextProvider>
          <MapSearchButtonComponent />
          <FooterComponent />
        </FiltersContextProvider>
      </SnackbarContextProvider>
    </PropertySearchResultsCountForCurrentQueryContext.Provider>
  );
};
