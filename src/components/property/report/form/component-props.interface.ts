import { PropertyReportFormSubmitPayloadInterface } from './submit-payload.interface';
import { TFunctionType } from 'types/t-function/type';

export interface PropertyReportFormComponentPropsInterface {
  t: TFunctionType;
  onClickSubmit: (payload: PropertyReportFormSubmitPayloadInterface) => void;
  loading: boolean;
  errorMessage?: string;
}
