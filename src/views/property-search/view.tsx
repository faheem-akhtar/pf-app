import { FiltersContextProvider } from 'components/filters/context-provider';
import { Fragment } from 'react';

import { FiltersSectionComponent } from 'components/filters-section/component';
import { FooterComponent } from 'components/footer/component';
import { HeadComponent } from 'components/head/component';
import { HeaderComponent } from 'components/header/component';
import { MapSearchButtonComponent } from 'components/map-search/button/component';
import { PaginationSectionComponent } from 'components/pagination-section/component';
import { PropertyListComponent } from 'components/property/list/component';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchNotFoundSectionTemplate } from 'components/property-search-not-found-section/template';
import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { PropertySearchViewPropsType } from './view-props.type';

import { usePageIsLoading } from 'helpers/page/is-loading.hook';

export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const pageIsLoading = usePageIsLoading();

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  const { filtersValueFromQuery, filtersData } = props;
  const filtersContextProps = { filtersValueFromQuery, filtersData };

  return (
    <PropertySearchResultsCountForCurrentQueryContext.Provider value={props.searchResult.total}>
      <HeadComponent pageTitle={'TODO-FE[CX-396]'} />
      <FiltersContextProvider {...filtersContextProps}>
        <HeaderComponent />
        <FiltersSectionComponent />
        {props.searchResult.total ? (
          <Fragment>
            <PropertySearchCountAndSortSectionComponent loading={pageIsLoading} count={props.searchResult.total} />
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
        <MapSearchButtonComponent />
        <FooterComponent />
      </FiltersContextProvider>
    </PropertySearchResultsCountForCurrentQueryContext.Provider>
  );
};
