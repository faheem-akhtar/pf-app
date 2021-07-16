import { ConfigLinksLinkInterface } from './link.interface';

export interface ConfigLinksDefinitionInterface {
  /**
   * primary links
   * header menu links partially in desktop
   * footer blue links in mobile
   */
  primary: [ConfigLinksLinkInterface[], ConfigLinksLinkInterface[]];
  /**
   * secondary links
   * footer links in desktop
   * gray links in mobile
   */
  secondary: [ConfigLinksLinkInterface[], ConfigLinksLinkInterface[]];
  /**
   * iOS - Mobile app link
   */
  iosDownloadLink: string;
  /**
   * Android - Mobile app link
   */
  androidDownloadLink: string;
}
