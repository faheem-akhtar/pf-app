/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextFieldComponent } from './component';
import { TextFieldComponentPropsInterface } from './component-props.interface';

export default {
  title: 'Library/Text Field',
  component: TextFieldComponent,
  args: {
    type: 'text',
    disabled: false,
    error: false,
    focus: false,
    value: '',
    floatPlaceholder: true,
    placeholder: 'Search',
    textarea: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
  },
} as Meta;

const Template: Story<TextFieldComponentPropsInterface & { focus?: boolean }> = (args): JSX.Element => (
  <div style={{ maxWidth: 226 }}>
    <TextFieldComponent {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

export const Disabled = Template.bind({});

Disabled.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  disabled: true,
};

export const Error = Template.bind({});

Error.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  error: true,
  errorText: 'Error message goes here',
};

export const Focused = Template.bind({});

Focused.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  focus: true,
};

export const WithHelperText = Template.bind({});

WithHelperText.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  helperText: 'What is this?',
};

export const Textarea = Template.bind({});

Textarea.args = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  textarea: true,
};
