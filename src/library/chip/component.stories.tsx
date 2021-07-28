/* eslint-disable pf-rules/export-name-validation */
import { ChipPropsInterface } from './props.interface';
import { ChipTemplate } from './template';

export default {
  title: 'Chip',
  component: ChipTemplate,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export const Chip = (args: ChipPropsInterface): JSX.Element => <ChipTemplate {...args} htmlFor='1' />;

Chip.args = {
  label: 'Chip Label',
  className: '',
  isDisabled: false,
  isSelected: false,
};
