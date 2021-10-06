import { CountryCurrencyEnum } from 'enums/country/currency.enum';

import { TealiumEventEnum } from './event.enum';
import { TealiumEventCategoryEnum } from './event-category.enum';
import { TealiumPageTypeEnum } from './page-type.enum';
import { TealiumSearchInteractionTypesEnum } from './search-interaction-types.enum';

export interface TealiumDataLayerInterface {
  tealium_event: TealiumEventEnum;
  page_type?: TealiumPageTypeEnum;
  page_category?: TealiumEventCategoryEnum;
  search_interaction_type?: TealiumSearchInteractionTypesEnum;
  page_currency_code?: CountryCurrencyEnum;
}
