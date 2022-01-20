/* eslint-disable @propertyfinder/rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { SkeletonTemplate } from './template';
import { SkeletonTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Skeleton',
  component: SkeletonTemplate,
  args: {
    className: '',
  },
} as Meta;

export const Skeleton: Story<SkeletonTemplatePropsInterface> = (args): JSX.Element => (
  <div style={{ maxWidth: '375px' }}>
    <SkeletonTemplate {...args} />
  </div>
);

Skeleton.args = {
  width: '100%',
  height: '4.8rem',
};
