import { StatsDataService } from '@propertyfinder/pf-frontend-common/dist/service/stats-data/service';

import { apiPropertyStatsDataFetcher } from 'api/property-stats-data/fetcher';
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
): {
  /**
   * Promise to load required stats data. only after this data is loaded listing impressions and leads can be fired
   */
  statsDataPromise: Promise<{ ok: boolean }>;
} => {
  const pageFailedToLoad = !props.ok || (prevProps && !prevProps.ok);

  if (
    pageFailedToLoad ||
    !helpersIsClient ||
    !props.ok ||
    (prevProps && !prevProps.ok) ||
    (prevProps && prevProps.filtersValueFromQuery === props.filtersValueFromQuery)
  ) {
    return { statsDataPromise: Promise.resolve({ ok: false }) };
  }

  const statsService = StatsService();
  const statsContexterService = StatsContexterService();

  const { searchResult, filtersValueFromQuery } = props;

  statsService.reset();

  statsContexterService.setAbTests(props.abTests);
  statsContexterService.setPropertySearch(filtersMapFiltersValueToStatsContextPropertySearch(filtersValueFromQuery));
  statsContexterService.setPropertyCategoryIdentifier(
    filtersMapCategoryIdToStats[filtersValueFromQuery[FiltersParametersEnum.categoryId]]
  );
  statsContexterService.setPropertySerp(true);
  statsService.pageView();

  const localContext = {
    pagination: {
      pageCurrent: filtersValueFromQuery[FiltersParametersEnum.pageNumber],
      itemPerPage: propertySerpItemsPerPage, // this property is not used in pf-frontend-common, but interface requires some value even it is not used
      itemTotal: searchResult.total,
    },
  };

  statsService.propertySerp(localContext);

  const statsDataPromise = apiPropertyStatsDataFetcher(
    props.searchResult.properties.map(propertySerpObfuscatedGetId),
    props.filtersValueFromQuery[FiltersParametersEnum.pageNumber]
  ).then((statsDataResult) => {
    if (statsDataResult.ok) {
      // populate global scope with properties data
      statsDataResult.data.forEach((propertyStatsData) => {
        StatsDataService().getPropertyStore().add(propertyStatsData);
      });

      // track property listing loaded
      searchResult.properties.forEach((obfuscatedProperty) => {
        statsService.propertyLoad(parseInt(propertySerpObfuscatedGetId(obfuscatedProperty), 10), localContext);
      });
    }

    return statsDataResult;
  });

  return {
    statsDataPromise,
  };
};
