import { Opaque } from 'helpers/types';

import { FiltersValueFieldCategoryId } from './category-id';
import { FiltersValueFieldChoiceInterface } from './choice.interface';

export type FiltersValueFieldCategoryIdChoice = Opaque<
  'FiltersValueFieldCategoryIdChoice',
  FiltersValueFieldChoiceInterface<FiltersValueFieldCategoryId>
>;
