/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { AccordionComponent } from './component';
import { AccordionComponentPropsInterface } from './component-props.interface';
import { AccordionPanelTemplate } from './panel/template';

export default {
  title: 'Library/Accordion',
  component: AccordionComponent,
  args: {
    title: 'Popular Searches',
  },
  argTypes: {
    expanded: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

export const Default: Story<AccordionComponentPropsInterface> = (args): JSX.Element => (
  <div style={{ width: 500 }}>
    <AccordionComponent {...args}>
      <AccordionPanelTemplate>Content</AccordionPanelTemplate>
    </AccordionComponent>
  </div>
);

Default.args = {};

export const Multiple: Story<AccordionComponentPropsInterface> = (args): JSX.Element => (
  <div style={{ width: 500 }}>
    <AccordionComponent {...args} expanded>
      <AccordionPanelTemplate>Content</AccordionPanelTemplate>
    </AccordionComponent>
    <AccordionComponent {...args} title='Nearby Areas'>
      <AccordionPanelTemplate>Content</AccordionPanelTemplate>
    </AccordionComponent>
  </div>
);

Multiple.args = {};
