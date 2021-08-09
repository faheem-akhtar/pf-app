/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { CheckboxTemplate } from './template';
import { CheckboxTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Checkbox',
  component: CheckboxTemplate,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const Checkbox: Story<CheckboxTemplatePropsInterface> = (args): JSX.Element => <CheckboxTemplate {...args} />;

Checkbox.args = {
  id: 'checkbox',
  checked: true,
  children: 'Checkbox',
};
