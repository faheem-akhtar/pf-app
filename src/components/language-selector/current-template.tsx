import { LanguageSelectorTemplate } from './template';
import { LanguageSelectorTemplatePropsInterface } from './template.props.interface';

export const LanguageSelectorCurrentTemplate = (props: LanguageSelectorTemplatePropsInterface): JSX.Element => (
  <LanguageSelectorTemplate {...props} />
);
