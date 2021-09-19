import { filtersMapCategoryIdToStats } from 'components/filters/map-category-id-to-stats';
import { filtersMapFiltersValueToStatsContextPropertySearch } from 'components/filters/map-filters-value-to-stats-context-property-search';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { helpersIsClient } from 'helpers/is-client';
import { StatsContexterService } from 'services/stats/contexter.service';
import { StatsService } from 'services/stats/service';

import { PropertySearchViewPropsType } from './view-props.type';

export const usePropertySearchTrackPageView = (
  prevProps: PropertySearchViewPropsType | void,
  props: PropertySearchViewPropsType
): void => {
  if (
    !props.ok ||
    (prevProps && !prevProps.ok) || // if page failed to load due to server side error - do not track page view
    !helpersIsClient
  ) {
    return;
  }

  // since it is a react hook it will be called on every render
  // but we should send the search page view only if the filtersValue has been changed
  if (prevProps && prevProps.filtersValueFromQuery === props.filtersValueFromQuery) {
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
      itemPerPage: 25, // this property is not used in pf-frontend-common, but interface requires some value even it is not used
      itemTotal: searchResult.total,
    },
  });
};
