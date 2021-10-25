import { StatsContextAbTestsInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/ab-tests.interface';

import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';
import { PageTypeEnum } from 'enums/page-type/enum';

export type PropertySearchViewPropsType =
  | {
      ok: true;
      filtersData: FiltersDataInterface;
      filtersValueFromQuery: FiltersValueInterface;
      searchResult: PropertySerpSearchResultType;
      documentTitle: string;
      abTests: StatsContextAbTestsInterface;
      pageType: PageTypeEnum;
      env: {
        snowplowHost: string;
        recaptchaKey: string;
      };
    }
  | {
      ok: false;
      error: string;
    };
