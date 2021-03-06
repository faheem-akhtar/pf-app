import React from 'react';

import { TFunctionType } from 'helpers/t-function/type';
import { GalleryScrollComponentPropsInterface } from 'library/gallery-scroll/component-props.interface';

import { PropertyCardBannersBannerInterface } from './banners/banner.interface';
import { PropertyCardTypeEnum } from './type.enum';

export type PropertyCardTemplatePropsType = {
  /**
   * Card type
   */
  cardType: PropertyCardTypeEnum;

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
  bedrooms: string | null;

  /**
   * Bathrooms
   */
  bathrooms: string | null;

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
   * Utilities price type
   */
  utilitiesPriceType: string;

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
  onGalleryIndexChange?: (index: number, length: number) => void;

  /**
   * On gallery click handler
   */
  onGalleryClick: () => void;

  /**
   * On property link click
   */
  onPropertyLinkClick: () => void;
};
