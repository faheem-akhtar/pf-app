/* eslint-disable pf-rules/export-name-validation */

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { SelectFieldTemplate } from './template';
import { SelectFieldTemplatePropsInterface } from './template-props.interface';

const options = [
  { value: null, label: '' },
  { value: 1, label: 'Apple' },
  { value: 2, label: 'Banana' },
  { value: 3, label: 'Orange' },
];

export default {
  title: 'Library/Select Field',
  component: SelectFieldTemplate,
  args: {
    disabled: false,
    dropdownIcon: true,
    className: '',
    label: 'Select',
    options,
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const SelectField = <V extends number | null>(args: SelectFieldTemplatePropsInterface<V>): JSX.Element => (
  <div style={{ width: '226px' }}>
    <SelectFieldTemplate {...args} />
  </div>
);

SelectField.args = {
  value: null,
  onChange: action('select field on change'),
};