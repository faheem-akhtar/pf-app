/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ChipTemplate } from './template';
import { ChipTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Chip',
  component: ChipTemplate,
  args: {
    className: '',
    isDisabled: false,
    isSelected: false,
    label: 'Chip Label',
  },
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as Meta;

export const Chip: Story<ChipTemplatePropsInterface> = (args): JSX.Element => (
  <div style={{ width: 226 }}>
    <ChipTemplate {...args} htmlFor='1' />
  </div>
);

Chip.args = {
  onClick: action('chip click'),
};
