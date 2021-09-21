import { StatsDataService } from '@propertyfinder/pf-frontend-common/dist/service/stats-data/service';

import { useApiPropertyStatsData } from 'api/property-stats-data/hook';
import { filtersMapCategoryIdToStats } from 'components/filters/map-category-id-to-stats';
import { filtersMapFiltersValueToStatsContextPropertySearch } from 'components/filters/map-filters-value-to-stats-context-property-search';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpItemsPerPage } from 'constants/property/serp/items-per-page';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { helpersIsClient } from 'helpers/is-client';
import { StatsContexterService } from 'services/stats/contexter.service';
import { StatsService } from 'services/stats/service';

import { PropertySearchViewPropsType } from './view-props.type';

export const usePropertySearchTrackPageView = (
  prevProps: PropertySearchViewPropsType | void,
  props: PropertySearchViewPropsType
): void => {
  const pageFailedToLoad = !props.ok || (prevProps && !prevProps.ok);
  const shouldLoadStatsData = !pageFailedToLoad && helpersIsClient;
  const statsDataResult = useApiPropertyStatsData(
    props.ok ? props.searchResult.properties.map(propertySerpObfuscatedGetId) : [],
    props.ok ? props.filtersValueFromQuery[FiltersParametersEnum.pageNumber] : 1,
    shouldLoadStatsData
  );

  if (statsDataResult.ok) {
    statsDataResult.data.forEach((propertyStatsData) => {
      StatsDataService().getPropertyStore().add(propertyStatsData);
    });
  }

  if (
    pageFailedToLoad ||
    !helpersIsClient ||
    !props.ok ||
    (prevProps && !prevProps.ok) ||
    (prevProps && prevProps.filtersValueFromQuery === props.filtersValueFromQuery)
  ) {
    return;
  }

  const { searchResult, filtersValueFromQuery } = props;

  StatsService().reset();

  // TODO-FE[CX-591] Set ab tests in stats context
  StatsContexterService().setAbTests({});
  StatsContexterService().setPropertySearch(filtersMapFiltersValueToStatsContextPropertySearch(filtersValueFromQuery));
  StatsContexterService().setPropertyCategoryIdentifier(
    filtersMapCategoryIdToStats[filtersValueFromQuery[FiltersParametersEnum.categoryId]]
  );
  StatsContexterService().setPropertySerp(true);
  StatsService().pageView();

  StatsService().propertySerp({
    pagination: {
      pageCurrent: filtersValueFromQuery[FiltersParametersEnum.pageNumber],
      itemPerPage: propertySerpItemsPerPage, // this property is not used in pf-frontend-common, but interface requires some value even it is not used
      itemTotal: searchResult.total,
    },
  });
};
