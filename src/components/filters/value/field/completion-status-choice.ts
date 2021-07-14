import { Opaque } from 'helpers/types';

import { FiltersValueFieldChoiceInterface } from './choice.interface';
import { FiltersValueFieldCompletionStatus } from './completion-status';

export type FiltersValueFieldCompletionStatusChoice = Opaque<
  'FiltersValueFieldCompletionStatus',
  FiltersValueFieldChoiceInterface<FiltersValueFieldCompletionStatus>
>;
