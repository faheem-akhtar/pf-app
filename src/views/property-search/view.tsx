import { useTranslation } from 'next-i18next';

import { FiltersSectionComponent } from 'components/filters-section/component';
import { FiltersValueContextProvider } from 'components/filters/context-provider';
import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { PaginationSectionComponent } from 'components/pagination-section/component';
import { PropertyCardComponent } from 'components/property-card/component';
import { PropertySearchComponentPropsType } from './view-props.type';
import { PropertySearchCountAndSortSectionComponent } from 'components/property-search-count-and-sort-section/component';
import { PropertySearchResultsCountForCurrentQueryContext } from './results-count-for-current-query/context';

import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { usePageIsLoading } from 'helpers/use/page-is-loading';

export const PropertySearchView = (props: PropertySearchComponentPropsType): JSX.Element => {
  const { t } = useTranslation('common');

  const pageIsLoading = usePageIsLoading();

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  const { filtersValueFromQuery, filtersData } = props;
  const filtersContextProps = { filtersValueFromQuery, filtersData };
  return (
    <PropertySearchResultsCountForCurrentQueryContext.Provider value={props.searchResult.total}>
      <FiltersValueContextProvider {...filtersContextProps}>
        <LayoutComponent pageTitle={t(pageIsLoading ? 'loading' : 'search_title')}>
          <HeaderComponent />
          <FiltersSectionComponent />
          <PropertySearchCountAndSortSectionComponent loading={pageIsLoading} count={props.searchResult.total} />
          {props.searchResult.properties.map((property) => (
            <PropertyCardComponent
              key={propertySerpObfuscatedGetUrl(property)}
              property={property}
              loading={pageIsLoading}
            />
          ))}
          <PaginationSectionComponent pagesAvailable={props.searchResult.pages} loading={pageIsLoading} />
          <FooterComponent />
        </LayoutComponent>
      </FiltersValueContextProvider>
    </PropertySearchResultsCountForCurrentQueryContext.Provider>
  );
};
