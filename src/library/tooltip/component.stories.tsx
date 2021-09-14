/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { TooltipPlacementEnum } from './placement.enum';
import { TooltipTemplate } from './template';
import { TooltipTemplatePropsInterface } from './template-props.interface';

export default {
  title: 'Library/Tooltip',
  component: TooltipTemplate,
  parameters: {
    layout: 'centered',
  },
  args: {
    placement: TooltipPlacementEnum.bottom,
    closeIcon: true,
    visible: true,
    dark: true,
  },
} as Meta;

export const Tooltip: Story<TooltipTemplatePropsInterface & { label: string }> = (args): JSX.Element => (
  <div style={{ position: 'relative' }}>
    <ButtonTemplate type='submit' componentType={ButtonComponentTypeEnum.primary} size={ButtonSizeEnum.regular}>
      <>
        Filters
        <TooltipTemplate {...args}>{args.label}</TooltipTemplate>
      </>
    </ButtonTemplate>
  </div>
);

Tooltip.args = {
  label: 'There are required documents that need to be uploaded in order to continue with the verification process.',
};
