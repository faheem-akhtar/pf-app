/* eslint-disable pf-rules/export-name-validation */

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import { InputBaseComponent } from './component';
import { InputBaseComponentPropsInterface } from './component-props.interface';

export default {
  title: 'Library/Input/Base',
  component: InputBaseComponent,
  args: {
    type: 'text',
    disabled: false,
    focus: false,
    value: '',
    floatPlaceholder: true,
    placeholder: 'Search',
    textarea: false,
    errorText: '',
    helperText: '',
  },
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
    onFocus: {
      table: {
        disable: true,
      },
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<InputBaseComponentPropsInterface & { focus?: boolean }> = (args): JSX.Element => {
  const [value, setValue] = useState('');

  return (
    <div style={{ maxWidth: 226 }}>
      <InputBaseComponent {...args} value={value} onChange={setValue} />
    </div>
  );
};

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
