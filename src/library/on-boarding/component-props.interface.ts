import { OnBoardingTemplateBaseInterface } from './template-base.interface';

export interface OnBoardingComponentPropsInterface extends OnBoardingTemplateBaseInterface {
  /*
   * On-boarding name
   */
  name: string;

  /**
   * On-boarding prerequisite name
   */
  prerequisiteName?: string;
}
