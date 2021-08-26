/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { SkeletonTemplate } from './template';

export default {
  title: 'Library/Skeleton',
  component: SkeletonTemplate,
  args: {
    className: '',
  },
} as Meta;

export const Skeleton: Story<{ className?: string }> = (args): JSX.Element => (
  <div style={{ maxWidth: '50%' }}>
    <SkeletonTemplate {...args} />
  </div>
);
