import { FiltersContextProvider } from 'components/filters/context-provider';
import { Fragment } from 'react';

import { FiltersSectionComponent } from 'components/filters-section/component';
import { FooterComponent } from 'components/footer/component';
import { HeadComponent } from 'components/head/component';
import { HeaderComponent } from 'components/header/component';
import { PaginationSectionComponent } from 'components/pagination-section/component';
import { PropertyCardComponent } from 'components/property-card/component';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchNotFoundSectionTemplate } from 'components/property-search-not-found-section/template';
import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';
import { PropertySearchViewPropsType } from './view-props.type';

import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { usePageIsLoadingHook } from 'helpers/hook/page-is-loading.hook';

export const PropertySearchView = (props: PropertySearchViewPropsType): JSX.Element => {
  const pageIsLoading = usePageIsLoadingHook();

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
            {props.searchResult.properties.map((property) => (
              <PropertyCardComponent
                key={propertySerpObfuscatedGetUrl(property)}
                property={property}
                loading={pageIsLoading}
              />
            ))}
            <PaginationSectionComponent pagesAvailable={props.searchResult.pages} loading={pageIsLoading} />
          </Fragment>
        ) : (
          <PropertySearchNotFoundSectionTemplate />
        )}
        <FooterComponent />
      </FiltersContextProvider>
    </PropertySearchResultsCountForCurrentQueryContext.Provider>
  );
};
