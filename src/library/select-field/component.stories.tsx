/* eslint-disable @propertyfinder/rules/export-name-validation */

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import { SelectFieldTemplate } from './template';
import { SelectFieldTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Select Field',
  component: SelectFieldTemplate,
  args: {
    disabled: false,
    dropdownIcon: true,
    className: '',
    errorText: '',
    label: 'Fruits',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const Template = (args: SelectFieldTemplatePropsInterface<number | null>): JSX.Element => (
  <div style={{ width: '226px' }}>
    <SelectFieldTemplate
      {...args}
      options={[
        { value: null, label: 'Any' },
        { value: 1, label: 'Apple' },
        { value: 2, label: 'Banana' },
        { value: 3, label: 'Orange' },
      ]}
    />
  </div>
);

Template.args = {
  value: null,
  onChange: action('select field on change'),
};
