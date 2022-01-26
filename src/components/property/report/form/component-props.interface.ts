import { TFunctionType } from 'helpers/t-function/type';

import { PropertyReportFormSubmitPayloadInterface } from './submit-payload.interface';

export interface PropertyReportFormComponentPropsInterface {
  t: TFunctionType;
  onClickSubmit: (payload: PropertyReportFormSubmitPayloadInterface) => void;
  loading: boolean;
  errorMessage?: string;
}
