import { AppearOnScrollComponentPropsInterface } from './component-props.interface';
import { AppearOnScrollStatusEnum } from './status.enum';

export interface AppearOnScrollTemplatePropsInterface
  extends Omit<
    AppearOnScrollComponentPropsInterface,
    'showOnLoad' | 'onExiting' | 'onHidden' | 'onEntering' | 'onVisible'
  > {
  /**
   * Status
   */
  status: AppearOnScrollStatusEnum | null;
}
