import { ReactNode } from 'react';

export interface LinkComponentPropsInterface {
  /**
   * The URL to link to when the button is clicked.
   */
  href: string;

  /**
   * Contains any child elements defined within the component
   */
  children: ReactNode;

  /**
   * Locale
   */
  locale?: string;
}
