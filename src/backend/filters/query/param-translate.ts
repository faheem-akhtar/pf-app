import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import locationsByLocale from '../../../../public/static/locations';
import { backendFiltersAdditionalPropertyTypes } from '../additional-property-types';
import { backendFiltersFindChoice } from '../find-choice';

const saleTypeTranslations: Record<string, string> = {
  'for-rent': 'للايجار',
  'for-sale': 'للبيع',
  للايجار: 'for-rent',
  للبيع: 'for-sale',
};

const mapFilterQueryToFilterParam: Partial<Record<FiltersQueryParamEnum, FiltersParametersEnum>> = {
  [FiltersQueryParamEnum.category]: FiltersParametersEnum.categoryId,
  [FiltersQueryParamEnum.propertyType]: 'propertyTypeSlug' as FiltersParametersEnum,
  [FiltersQueryParamEnum.bedroom]: FiltersParametersEnum.minBedroom,
  [FiltersQueryParamEnum.furnish]: FiltersParametersEnum.furnishing,
  [FiltersQueryParamEnum.priceType]: FiltersParametersEnum.pricePeriod,
};

/**
 * It will translate the values of params
 * @example { categorySlug: 'rent' } => { categorySlug: 'للبيع' }
 */
export const backendFiltersQueryParamTranslate = <T extends Partial<Record<FiltersQueryParamEnum, string>>>(
  params: T,
  currentLocale: string,
  targetLocale: string
): T => {
  return (Object.keys(params) as Array<FiltersQueryParamEnum>).reduce((acc, key) => {
    const val = params[key];
    let currentLocation: LocationCompactInterface | undefined;
    let targetLocation: LocationCompactInterface | undefined;
    const filterParam = mapFilterQueryToFilterParam[key];
    const currentChoice = filterParam ? backendFiltersFindChoice(currentLocale, filterParam, val as string) : undefined;
    const alternateChoice = filterParam
      ? backendFiltersFindChoice(targetLocale, filterParam, (item) => item.value === currentChoice?.value)
      : undefined;

    switch (key) {
      case FiltersQueryParamEnum.category:
      case FiltersQueryParamEnum.bedroom:
      case FiltersQueryParamEnum.furnish:
      case FiltersQueryParamEnum.priceType:
        if (alternateChoice) {
          acc[key] = alternateChoice.slug[alternateChoice.slug.length - 1];
        }
        break;

      case FiltersQueryParamEnum.propertyType:
        if (alternateChoice) {
          acc[key] = alternateChoice.slug[alternateChoice.slug.length - 1];
        } else if (backendFiltersAdditionalPropertyTypes[val as string]) {
          acc[key] = backendFiltersAdditionalPropertyTypes[val as string];
        }
        break;

      case FiltersQueryParamEnum.location:
      case FiltersQueryParamEnum.city:
        currentLocation = (locationsByLocale as unknown as Record<string, LocationCompactInterface[]>)[
          currentLocale
        ].find((item) => item.slug === val);
        targetLocation = (locationsByLocale as unknown as Record<string, LocationCompactInterface[]>)[
          targetLocale
        ].find((item) => item.id === currentLocation?.id);

        if (targetLocation) {
          acc[key] = targetLocation.slug;
        }
        break;

      case FiltersQueryParamEnum.saleType:
        acc[key] = saleTypeTranslations[val as string];
        break;
    }

    return acc;
  }, {} as T);
};
