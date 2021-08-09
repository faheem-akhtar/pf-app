/* eslint-disable pf-rules/export-name-validation */

import { Meta } from '@storybook/react';

import { SelectFieldTemplate } from './template';
import { SelectFieldTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Select Field',
  component: SelectFieldTemplate,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const SelectField = <V extends number | null>(args: SelectFieldTemplatePropsInterface<V>): JSX.Element => (
  <div style={{ width: '226px' }}>
    <SelectFieldTemplate {...args} />
  </div>
);

const options = [
  { value: null, label: '' },
  { value: 1, label: 'Apple' },
  { value: 2, label: 'Banana' },
  { value: 3, label: 'Orange' },
];

SelectField.args = {
  disabled: false,
  dropdownIcon: true,
  className: '',
  label: 'Select',
  options,
  value: null,
};
