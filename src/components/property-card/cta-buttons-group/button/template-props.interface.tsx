import { IconTemplatePropsInterface } from 'components/icon/template-props.interface';

export type PropertyCardCtaButtonsGroupButtonTemplatePropsInterface = {
  href: string;
  onClick: () => void;
  iconComponent: React.FunctionComponent<IconTemplatePropsInterface>;
  label: string;
};
