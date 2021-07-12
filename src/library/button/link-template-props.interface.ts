import { ButtonTemplatePropsBaseInterface } from './template-props-base.interface';

export interface ButtonLinkTemplatePropsInterface extends ButtonTemplatePropsBaseInterface {
  /**
   * The URL to link to when the button is clicked.
   */
  href: string;

  /**
   * Link rel
   */
  rel?: string;

  /**
   * Link target.
   */
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';

  /**
   * Should the link be downloadable
   * If string, Specifies the new filename for the downloaded file
   */
  download?: string | true;
}
