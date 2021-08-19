/* eslint-disable pf-rules/export-name-validation */

import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { PropertyMock } from 'mocks/property/mock';

export default {
  title: 'MDOT/Property card',
  component: PropertyCardTemplate,
} as Meta;

export const PropertyCard: Story<PropertyCardTemplatePropsType> = (args): JSX.Element => (
  <div style={{ width: 360 }}>
    <PropertyCardTemplate {...args} t={(x: string): string => x} />
  </div>
);

PropertyCard.args = {
  property: PropertyMock,
  gallery: {
    onTouch: (): null => null,
    items: [
      {
        sourceUrl:
          'https://www.propertyfinder.ae/property/0d8de151cfe7d450e2d3d6a89a2df5e4/260/185/MODE/839734/8151024-492b2o.jpg?ctr=ae',
      },
    ],
    isRtl: false,
  },
  loading: false,
  ctaButtons: {
    onCallClick: action('onCallClick'),
    onWhatsappClick: action('onWhatsappClick'),
    onEmailClick: action('onEmailClick'),
    t: (x: string): string => x,
  },
  onSaveButtonClick: action('onSaveButtonClick'),
  onMenuButtonClick: action('onMenuButtonClick'),
};
