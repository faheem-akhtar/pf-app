import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { AnalyticsPageNamesEnum } from 'services/analytics/page-names.enum';

import { TealiumEventEnum } from './event.enum';
import { TealiumPageTypeEnum } from './page-type.enum';
import { TealiumSearchInteractionTypesEnum } from './search-interaction-types.enum';

export interface TealiumDataLayerInterface {
  tealium_event: TealiumEventEnum;
  page_type?: TealiumPageTypeEnum;
  page_category?: AnalyticsPageNamesEnum;
  search_interaction_type?: TealiumSearchInteractionTypesEnum;
  page_currency_code?: CountryCurrencyEnum;
}
