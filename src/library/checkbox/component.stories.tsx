/* eslint-disable @propertyfinder/rules/export-name-validation */

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { CheckboxTemplate } from './template';
import { CheckboxTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Checkbox',
  component: CheckboxTemplate,
  args: {
    id: 'checkbox',
    checked: true,
    children: 'Checkbox',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const Checkbox: Story<CheckboxTemplatePropsInterface> = (args): JSX.Element => <CheckboxTemplate {...args} />;

Checkbox.args = {
  onChange: action('onChange'),
};
