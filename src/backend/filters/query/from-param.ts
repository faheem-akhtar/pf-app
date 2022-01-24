import { Redirect } from 'next';
import locationsByLocale from 'public/static/locations';
import locationsHistorySlugByLocale from 'public/static/locations-slug-history';

import { FiltersQueryInterface } from 'components/filters/query/interface';
import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { FiltersQueryParamInterface } from 'components/filters/query/param.interface';
import { configLocationInvalidSlug } from 'config/location/invalid-slug';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';
import { LocationSlugHistoryInterface } from 'types/location/slug-history.interface';

import { backendFiltersAdditionalPropertyTypes } from '../additional-property-types';
import { backendFiltersFindChoice } from '../find-choice';

const mapSaleTypeToCategoryId: Record<string, string[]> = {
  'for-rent': ['2', '4'],
  للايجار: ['4', '2'],
  للإجار: ['4', '2'],
  'for-sale': ['1', '3'],
  للبيع: ['1', '3'],
};

const mapFilterQueryToFilterParam: Partial<
  Record<FiltersQueryParamEnum, { param: FiltersParametersEnum; query?: FiltersQueryParametersEnum }>
> = {
  [FiltersQueryParamEnum.category]: {
    param: FiltersParametersEnum.categoryId,
    query: FiltersQueryParametersEnum.categoryId,
  },
  [FiltersQueryParamEnum.propertyType]: { param: 'propertyTypeSlug' as FiltersParametersEnum },
  [FiltersQueryParamEnum.bedroom]: { param: FiltersParametersEnum.bedrooms },
  [FiltersQueryParamEnum.furnish]: {
    param: FiltersParametersEnum.furnishing,
    query: FiltersQueryParametersEnum.furnishing,
  },
  [FiltersQueryParamEnum.priceType]: {
    param: FiltersParametersEnum.pricePeriod,
    query: FiltersQueryParametersEnum.pricePeriod,
  },
};

/**
 * It will construct a filters query parameter from a query
 * @example /rent/dubai/apartments => ?c=2&l=1&t=1
 */
export const backendFiltersQueryFromParam = (
  queryParams: FiltersQueryParamInterface,
  locale: string,
  uri: string
): { query: Partial<FiltersQueryInterface & { [key: string]: string }>; error: boolean; redirect?: Redirect } => {
  let error = false;
  let redirect: Redirect | undefined;
  const decodedQuery = (Object.entries(queryParams) as [keyof FiltersQueryParamInterface, string][]).reduce(
    (acc, [key, value]) => {
      acc[key] = decodeURI(value);
      return acc;
    },
    {} as Record<keyof FiltersQueryParamInterface, string>
  );

  return {
    query: (Object.keys(decodedQuery) as Array<keyof typeof decodedQuery>).reduce((acc, key) => {
      let location: LocationCompactInterface | undefined;
      let locationSlugHistory: LocationSlugHistoryInterface | undefined;
      const filters = mapFilterQueryToFilterParam[key];
      const currentChoice = filters ? backendFiltersFindChoice(locale, filters.param, decodedQuery[key]) : undefined;

      switch (key) {
        case FiltersQueryParamEnum.category:
        case FiltersQueryParamEnum.furnish:
        case FiltersQueryParamEnum.priceType:
          if (currentChoice) {
            acc[filters?.query as string] = currentChoice.value.toString();
          } else {
            error = true;
            // eslint-disable-next-line no-console
            console.error(`Invalid ${key} value in the url: ${decodedQuery[key]}`);
          }
          break;

        case FiltersQueryParamEnum.bedroom:
          if (currentChoice) {
            acc[FiltersQueryParametersEnum.bedrooms] = [currentChoice.value.toString()];
          } else {
            error = true;
            // eslint-disable-next-line no-console
            console.error(`Invalid ${key} value in the url: ${decodedQuery[key]}`);
          }
          break;

        case FiltersQueryParamEnum.propertyType:
          if (currentChoice) {
            acc[FiltersQueryParametersEnum.propertyTypeId] = currentChoice.value.toString();
          } else if (!backendFiltersAdditionalPropertyTypes[decodedQuery[key]]) {
            error = true;
            // eslint-disable-next-line no-console
            console.error(`Invalid ${key} value in the url: ${decodedQuery[key]}`);
          }
          break;

        case FiltersQueryParamEnum.city:
        case FiltersQueryParamEnum.location:
          location = (locationsByLocale as unknown as Record<string, LocationCompactInterface[]>)[locale].find(
            (item) => item.slug === decodedQuery[key]
          );
          locationSlugHistory = (locationsHistorySlugByLocale as Record<string, LocationSlugHistoryInterface[]>)[
            locale
          ].find((item) => item.originalSlug === decodedQuery[key]);
          if (location) {
            acc[FiltersQueryParametersEnum.locationsIds] = location.id;
          } else if (locationSlugHistory) {
            // Do a permanent redirect if the location slug exist in the location slug history.
            // @example Redirect https://www.propertyfinder.bh/en/rent/capital-governorate/apartments-for-rent-adliya.html
            // to https://www.propertyfinder.bh/en/rent/capital-governorate/apartments-for-rent-manama-adliya.html
            redirect = {
              destination: uri.replace(
                encodeURI(locationSlugHistory.originalSlug),
                encodeURI(locationSlugHistory.newSlug)
              ),
              permanent: true,
            };
          } else if (key === FiltersQueryParamEnum.location && configLocationInvalidSlug.includes(decodedQuery[key])) {
            // Do a permanent redirect for some specific invalid location slug.
            // Completely remove such location slugs.
            // @example Redirect https://www.propertyfinder.sa/en/rent/ar-riyadh/villas-for-rent-riyadh.html
            // to https://www.propertyfinder.sa/en/rent/ar-riyadh/villas-for-rent.html
            redirect = {
              destination: uri.replace(new RegExp(`-${encodeURI(decodedQuery[key])}(-|\\.)`), '$1'),
              permanent: true,
            };
          } else {
            error = true;
            // eslint-disable-next-line no-console
            console.error(`Invalid location value in the url: ${decodedQuery[key]}`);
          }
          break;

        case FiltersQueryParamEnum.saleType:
          if (
            !mapSaleTypeToCategoryId[decodedQuery[key] as string]?.includes(
              acc[FiltersQueryParametersEnum.categoryId] || ''
            )
          ) {
            error = true;
            // eslint-disable-next-line no-console
            console.error(`Invalid sale type value in the url: ${decodedQuery[key]}`);
          }
          break;

        default:
          acc[key] = queryParams[key];
          break;
      }

      return acc;
    }, {} as ReturnType<typeof backendFiltersQueryFromParam>['query']),
    error,
    redirect,
  };
};
