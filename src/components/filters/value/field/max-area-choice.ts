import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldMaxArea } from './max-area';

export type FiltersValueFieldMaxAreaChoice = Opaque<
  'FiltersValueFieldMaxArea',
  FiltersValueFieldChoiceInterface<FiltersValueFieldMaxArea>
>;
