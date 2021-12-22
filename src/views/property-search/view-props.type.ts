import { StatsContextAbTestsInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/ab-tests.interface';

import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { BreadcrumbInterface } from 'components/property/list/breadcrumb/interface';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';
import { SeoDataInterface } from 'components/seo/data.interface';
import { PageTypeEnum } from 'enums/page-type/enum';
import { ViewsPageMetaInterface } from 'views/page-meta.interface';

export type PropertySearchViewPropsType =
  | {
      ok: true;
      filtersData: FiltersDataInterface;
      filtersValueFromQuery: FiltersValueInterface;
      searchResult: PropertySerpSearchResultType;
      abTests: StatsContextAbTestsInterface;
      pageType: PageTypeEnum;
      meta: ViewsPageMetaInterface;
      env: {
        snowplowHost: string;
        recaptchaKey: string;
      };
      breadcrumbs: BreadcrumbInterface[];
      seoData?: SeoDataInterface;
    }
  | {
      ok: false;
      error: string;
    };
