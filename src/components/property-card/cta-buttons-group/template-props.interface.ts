import { TFunctionType } from 'types/t-function/type';

import { PropertyContactOptionsListInterface } from '../../property/contact-options-list.interface';

export interface PropertyCardCtaButtonsGroupTemplatePropsInterface {
  /**
   * Contact Options
   */
  contactOptions: PropertyContactOptionsListInterface;
  /**
   * On call click
   */
  onCallClick: () => void;
  /**
   * On Whatsapp click
   */
  onWhatsappClick: () => void;
  /**
   * On Email click
   */
  onEmailClick: () => void;
  /**
   * Translate function
   */
  t: TFunctionType;
}
