/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { TagTemplate } from './template';
import { TagTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Tag',
  component: TagTemplate,
  args: {
    className: '',
  },
} as Meta;

export const Tag: Story<TagTemplatePropsInterface & { label: string }> = (args): JSX.Element => (
  <div style={{ width: 226 }}>
    <TagTemplate {...args}>{args.label}</TagTemplate>
  </div>
);

Tag.args = {
  label: 'New',
};
