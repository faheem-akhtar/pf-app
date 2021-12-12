import { PropertyCardTemplatePropsType } from '../template-props.type';

export interface PropertyCardMenuTemplatePropsInterface
  extends Pick<PropertyCardTemplatePropsType, 'cardType' | 'saved' | 'onSaveButtonClick' | 'onMenuButtonClick'> {}
