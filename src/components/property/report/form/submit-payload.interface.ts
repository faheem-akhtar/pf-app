import { ReportAttributesInterface } from 'types/report/attributes-interface';

export interface PropertyReportFormSubmitPayloadInterface extends ReportAttributesInterface {
  attachment?: File;
}
