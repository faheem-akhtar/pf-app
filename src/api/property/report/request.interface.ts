import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';

export interface ApiPropertyReportRequestInterface {
  /**
   * User email
   */
  email: string;

  /**
   * User message
   */
  message: string;

  /**
   * Reason id
   * selected dropdown index
   */
  reason_id: PropertyReportReasonEnum;

  /**
   * Renter if user is in rent
   */
  reporter_type: PropertyReportUserTypeEnum | '';
}
