import { useEffect } from 'react';

import { AnalyticsPageNamesEnum } from 'services/analytics/page-names.enum';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

import { tealiumAdapterPropertyListStats } from './adapter/property-list-stats';
import { tealiumAdapterSearchStats } from './adapter/search-stats';
import { TealiumEventEnum } from './event.enum';
import { TealiumPageTypeEnum } from './page-type.enum';
import { TealiumSearchInteractionTypesEnum } from './search-interaction-types.enum';

export const useServicesTealiumSearch = (props: PropertySearchViewPropsType): void => {
  useEffect(() => {
    if (!props.ok) {
      return;
    }

    const { filtersValueFromQuery, filtersData } = props;
    const searchPayload = tealiumAdapterSearchStats(filtersValueFromQuery, filtersData);
    const propertyListPayload = tealiumAdapterPropertyListStats(props.searchResult.properties, filtersValueFromQuery);

    AnalyticsTealiumService.onPageViewRendered({
      tealium_event: TealiumEventEnum.search,
      page_type: TealiumPageTypeEnum.list,
      search_interaction_type: TealiumSearchInteractionTypesEnum.landing,
      page_category: AnalyticsPageNamesEnum.propertySearchPage,
      ...searchPayload,
      ...propertyListPayload,
    });
  }, [props]);
};
