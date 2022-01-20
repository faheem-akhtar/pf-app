/* eslint-disable @propertyfinder/rules/export-name-validation */

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { PropertyCardTypeEnum } from 'components/property-card/type.enum';

import { PropertyCardBannersBannerInterface } from '../banners/banner.interface';
import { PropertyCardBannersBannerClassEnum } from '../banners/banner-class.enum';
import styles from '../stories.module.scss';
import { PropertyCardTemplate } from '../template';
import { PropertyCardTemplatePropsType } from '../template-props.type';

const demoBanners: { [key: string]: PropertyCardBannersBannerInterface } = {
  verified: {
    text: 'Verified',
    colorClass: PropertyCardBannersBannerClassEnum.VERIFIED,
  },
  new: {
    text: 'New construction',
    colorClass: PropertyCardBannersBannerClassEnum.NEW,
  },
  direct: {
    text: 'Direct from developer',
    colorClass: PropertyCardBannersBannerClassEnum.FROM_DEVELOPER,
  },
  live: {
    text: 'Live Viewing',
    colorClass: PropertyCardBannersBannerClassEnum.LIVE_VIEWING,
  },
};

export default {
  title: 'MDOT/Property Card',
  component: PropertyCardTemplate,
  args: {
    type: 'Apartment',
    price: '2,575,000 AED',
    customTitle: 'EXCLUSIVE VILLA | 30 FLOORS HIGH | NANNY FLOOR, NOT ROOM',
    location: 'Laguna Tower, Lake Almas West, Jumeirah Lake Tower, unnecessary text to showcase ellipsis',
    area: '1,356 sqft',
    publishDate: 'Published 3 days ago',
    showBanners: true,
    utilitiesIncluded: false,
    saved: false,
    gallery: {
      onTouch: (): null => null,
      items: [
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/0d8de151cfe7d450e2d3d6a89a2df5e4/260/185/MODE/839734/8151024-492b2o.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/0d8de151cfe7d450e2d3d6a89a2df5e4/260/185/MODE/839734/8151024-492b2o.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/610d21efe03411ef664a9cb33fe25924/668/452/MODE/8ff4a2/8323893-2e8f0o.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/bcfd7ef905556c311697811c6298a3d2/668/452/MODE/8fe8f6/8323893-ffb96o.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/3f3de8501af19836f0d4125a7f73d8ae/668/452/MODE/61b99b/8323893-d27edo.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/201b371bfa25f0c67e01fc4612e1a857/668/452/MODE/3cf077/8323893-9f74co.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/74fcb0e1bd052a04fefeda1c1953db31/668/452/MODE/62847a/8323893-a2057o.jpg?ctr=ae',
        },
        {
          sourceUrl:
            'https://www.propertyfinder.ae/property/a56c3ff080e52833dad01af955dc267d/668/452/MODE/b5b360/8323893-20122o.jpg?ctr=ae',
        },
      ],
      isRtl: false,
    },
    loading: false,
  },
  argTypes: {
    onSaveButtonClick: { action: 'onSaveButtonClick' },
    onMenuButtonClick: { action: 'onMenuButtonClick' },
    onCallClick: { action: 'onCallClick' },
    onEmailClick: { action: 'onEmailClick' },
    onWhatsappClick: { action: 'onWhatsappClick' },
    onGalleryClick: { action: 'onGalleryClick' },

    bathrooms: {
      defaultValue: '1 Bathroom',
      options: [null, '1 Bathroom', '2 Bathrooms', '3 Bathrooms', '4 Bathrooms', '5 Bathrooms', '6 Bathrooms'],
      control: {
        type: 'select',
      },
    },
    bedrooms: {
      defaultValue: 'studio',
      options: [null, 'studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5 Bedrooms', '6 Bedrooms'],
      control: {
        type: 'select',
      },
    },
    // Non related
    bannerOptions: {
      defaultValue: ['verified'],
      name: 'Banner options',
      options: Object.keys(demoBanners),
      control: {
        type: 'check',
      },
    },
    phoneNumber: {
      control: {
        disable: true,
      },
    },
    href: {
      control: {
        disable: true,
      },
    },
    whatsAppLink: {
      control: {
        disable: true,
      },
    },
    banners: {
      control: {
        disable: true,
      },
    },
    t: {
      control: {
        disable: true,
      },
    },
    gallery: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<PropertyCardTemplatePropsType & { bannerOptions: string[] }> = (args): JSX.Element => {
  const { bannerOptions, ...props } = args;

  const banners = bannerOptions.map((item) => demoBanners[item]);

  const noImagesCard = { ...props };
  noImagesCard.gallery = {
    ...props.gallery,
    items: [],
  };

  return (
    <div style={{ width: 375, paddingBottom: '5rem' }}>
      <div className={styles.item}>
        <PropertyCardTemplate banners={banners} {...props} t={(x: string): string => x} />
      </div>
      <div className={styles.item}>
        <PropertyCardTemplate banners={banners} {...noImagesCard} t={(x: string): string => x} />
      </div>
    </div>
  );
};

export const Modern = Template.bind({});

Modern.args = {
  cardType: PropertyCardTypeEnum.modern,
  onSaveButtonClick: action('onSaveButtonClick'),
  onMenuButtonClick: action('onMenuButtonClick'),
};

export const Classic = Template.bind({});

Classic.args = {
  cardType: PropertyCardTypeEnum.classic,
  onSaveButtonClick: action('onSaveButtonClick'),
  onMenuButtonClick: action('onMenuButtonClick'),
};
