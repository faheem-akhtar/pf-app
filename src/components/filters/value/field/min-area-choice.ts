import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMinArea } from './min-area';

export type FiltersValueFieldMinAreaChoice = Opaque<
  'FiltersValueFieldMinArea',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMinArea>
>;
