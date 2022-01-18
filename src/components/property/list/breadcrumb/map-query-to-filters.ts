import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { LocationService } from 'services/location/service';

const entries: string[] = Object.values(FiltersQueryParametersEnum);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapQueryToFiltersResultType = { [key in FiltersParametersEnum]?: any };

/**
 * @param link Clicked breadcrumb link
 */
export const breadcrumbMapQueryToFilters = (link: string): MapQueryToFiltersResultType => {
  const query = link.split('search?')[1];
  const values: MapQueryToFiltersResultType = {};

  query.split('&').forEach((param) => {
    const [queryKey, queryValue] = param.split('=');
    const indexOfParam = entries.indexOf(queryKey);
    const filtersQueryParameterKey = Object.keys(FiltersQueryParametersEnum)[indexOfParam];

    if (queryKey === FiltersQueryParametersEnum.locationsIds) {
      values[FiltersParametersEnum.locationsIds] = queryValue
        .split('-')
        ?.map((id) => LocationService.find((location) => location.id === id));
      return;
    }

    values[FiltersParametersEnum[filtersQueryParameterKey as keyof typeof FiltersParametersEnum]] = queryValue;
  });

  return values;
};
