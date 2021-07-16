export type Link = {
  /**
   * translation key for links
   */
  translationKey: string;
  /**
   * target path or url
   */
  target: string;
};

export interface ConfigLinksDefinitionInterface {
  /**
   * primary links
   * header menu links partially in desktop
   * footer blue links in mobile
   */
  primary: [Link[], Link[]];
  /**
   * secondary links
   * footer links in desktop
   * gray links in mobile
   */
  secondary: [Link[], Link[]];
  /**
   * iOS - Mobile app link
   */
  iosDownloadLink: string;
  /**
   * Android - Mobile app link
   */
  androidDownloadLink: string;
}
