/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonComponentTypeEnum } from './component-type.enum';
import { ButtonIconPositionEnum } from './icon-position.enum';
import { ButtonLinkTemplatePropsInterface } from './link-template-props.interface';
import { ButtonSizeEnum } from './size.enum';
import { ButtonTemplate } from './template';
import { ButtonTemplatePropsInterface } from './template-props.interface';

import { IconCloseTemplate } from 'components/icon/close-template';

export default {
  title: 'Library/Button',
  component: ButtonTemplate,
  args: {
    disabled: false,
    loading: false,
    size: ButtonSizeEnum.small,
    componentType: ButtonComponentTypeEnum.tertiary,
    label: 'Label',
    icon: {
      component: IconCloseTemplate,
      position: ButtonIconPositionEnum.right,
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonTemplatePropsInterface & ButtonLinkTemplatePropsInterface & { label: string }> = (args) => (
  <ButtonTemplate {...args}>{args.label}</ButtonTemplate>
);

export const Button = Template.bind({});

Button.args = {
  type: 'button',
  onClick: action('button click'),
};

export const Link = Template.bind({});

Link.args = {
  href: 'https://propertyfinder.ae',
  onClick: action('link click'),
};
