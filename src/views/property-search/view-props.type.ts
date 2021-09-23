import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';

export type PropertySearchViewPropsType =
  | {
      ok: true;
      filtersData: FiltersDataInterface;
      filtersValueFromQuery: FiltersValueInterface;
      searchResult: PropertySerpSearchResultType;
      documentTitle: string;
    }
  | {
      ok: false;
      error: string;
    };
