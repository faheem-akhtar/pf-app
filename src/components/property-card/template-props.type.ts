import React from 'react';

import { GalleryScrollComponentPropsInterface } from 'library/gallery-scroll/component-props.interface';
import { TFunctionType } from 'types/t-function/type';

import { PropertyCardBannersBannerInterface } from './banners/banner.interface';

export type PropertyCardTemplatePropsType = {
  /**
   * Is propety loading
   */
  loading: boolean;
  /**
   * Gallery scroll props
   */
  gallery: GalleryScrollComponentPropsInterface;

  /**
   * Type of property
   */
  type: string;
  /**
   * Price
   */
  price: string;
  /**
   * Custom card title
   */
  customTitle: string;
  /**
   * Location
   */
  location: string;
  /**
   * Bedrooms
   */
  bedrooms: string;
  /**
   * Bathrooms
   */
  bathrooms: string;
  /**
   * Area
   */
  area: string;
  /**
   * Whether is saved or not
   */
  saved: boolean;
  /**
   * Publishing date
   */
  publishDate: string;
  /**
   * Delivery date
   */
  deliveryDate?: string;
  /**
   * Contact date
   */
  contactDate?: string;
  /**
   * Banners to display
   */
  banners?: PropertyCardBannersBannerInterface[];
  /**
   * Whether or not banners are visible
   */
  showBanners?: boolean;
  /**
   * Property page link
   */
  href: string;
  /**
   * Utilities included
   */
  utilitiesIncluded: boolean;
  /**
   * Phone number
   */
  phoneNumber?: string;
  /**
   * Whatsapp link
   */
  whatsAppLink?: string;
  /**
   * Translate function
   */
  t: TFunctionType;
  /**
   * On save button click handler
   */
  onSaveButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * On Menu button click handler
   */
  onMenuButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * On Phone button click handler
   */
  onCallClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * On Email button click handler
   */
  onEmailClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * On Whatsapp button click handler
   */
  onWhatsappClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * On gallery index change handler
   */
  onGalleryIndexChange?: (index: number) => void;
  /**
   * On gallery click handler
   */
  onGalleryClick: () => void;
};
