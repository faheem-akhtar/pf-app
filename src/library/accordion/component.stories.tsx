/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';

import { AccordionComponent } from './component';
import { AccordionItemComponent } from './item/component';
import { AccordionItemComponentPropsInterface } from './item/component-props.interface';

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

export const Accordion: Story<AccordionItemComponentPropsInterface> = (args): JSX.Element => (
  <div style={{ width: 500 }}>
    <AccordionComponent>
      <AccordionItemComponent title={args.title} expanded>
        Content
      </AccordionItemComponent>
      <AccordionItemComponent title='Nearby areas'>Content</AccordionItemComponent>
    </AccordionComponent>
  </div>
);

Accordion.args = {};
