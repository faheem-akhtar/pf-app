export interface SeoContentComponentPropsInterface {
  /**
   * The h2 heading
   */
  heading?: string;

  /**
   * HTML content
   */
  content?: string;

  /**
   * An image
   */
  image?: {
    /**
     * Src url
     */
    url: string;

    /**
     * Alt text
     */
    alt?: string;

    /**
     * Image alignment
     * @default right
     */
    align?: 'left' | 'right';
  };
}
