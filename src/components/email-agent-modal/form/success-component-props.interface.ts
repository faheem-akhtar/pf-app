import { MortgageCampaignComponentPropsInterface } from 'components/mortgage/campaign/component-props.interface';
import { UserModelInterface } from 'services/user/model.interface';
import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';
import { TFunctionType } from 'types/t-function/type';

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
  user: UserModelInterface | null;

  /**
   * Fields value
   */
  fieldsValue: PropertyLeadAttributesInterface;
}
