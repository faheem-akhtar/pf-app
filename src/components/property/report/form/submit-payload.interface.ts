import { ApiPropertyReportRequestInterface } from 'api/property/report/request.interface';

export interface PropertyReportFormSubmitPayloadInterface extends ApiPropertyReportRequestInterface {
  attachment?: File;
}
