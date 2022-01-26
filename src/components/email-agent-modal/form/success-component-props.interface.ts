import { MortgageCampaignComponentPropsInterface } from 'components/mortgage/campaign/component-props.interface';
import { PropertyLeadInterface } from 'components/property/lead.interface';
import { UserInterface } from 'components/user/interface';
import { TFunctionType } from 'helpers/t-function/type';

export interface EmailAgentModalFormSuccessComponentPropsInterface
  extends Pick<MortgageCampaignComponentPropsInterface, 'property'> {
  /**
   * A ref to access auth pop-up
   */
  openAuthRef: React.MutableRefObject<() => void>;

  /**
   * Called when the not now button clicked.
   */
  closeModal: () => void;

  /**
   * Translate function
   */
  t: TFunctionType;

  /**
   * User
   */
  user: UserInterface | null;

  /**
   * Fields value
   */
  fieldsValue: PropertyLeadInterface;
}
