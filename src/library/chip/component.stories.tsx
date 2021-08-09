/* eslint-disable pf-rules/export-name-validation */

import { ChipTemplate } from './template';
import { ChipTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Chip',
  component: ChipTemplate,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Chip = (args: ChipTemplatePropsInterface): JSX.Element => <ChipTemplate {...args} htmlFor='1' />;

Chip.args = {
  label: 'Chip Label',
  className: '',
  isDisabled: false,
  isSelected: false,
};
