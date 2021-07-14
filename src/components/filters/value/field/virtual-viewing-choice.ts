import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldVirtualViewing } from './virtual-viewing';

export type FiltersValueFieldVirtualViewingChoice = Opaque<
  'FiltersValueFieldVirtualViewing',
  FiltersValueFieldChoiceInterface<FiltersValueFieldVirtualViewing>
>;
