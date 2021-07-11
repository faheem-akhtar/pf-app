import React from 'react';

export interface LayoutComponentPropsInterface {
  /**
   * Page title
   */
  pageTitle: string;

  /**
   * Children components
   */
  children: React.ReactNode;
}
