import { PropertyReportUserTypeEnum } from 'enums/property/report-user-type.enum';

export interface ReportAttributesInterface {
  /**
   * user email
   */
  email: string;

  /**
   * user message
   */
  message: string;

  /**
   * reason id
   * selected dropdown index
   */
  reason_id: number;

  /**
   * renter if user is in rent
   */
  reporter_type: PropertyReportUserTypeEnum | '';
}
