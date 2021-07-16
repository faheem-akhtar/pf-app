import { ConfigLinksDefinitionInterface } from './definition.interface';
import { configLinksMobileAppAndroid } from './mobile-app/android';
import { configLinksMobileAppIos } from './mobile-app/ios';
import { configLinksPrimaryBlog } from './primary/blog';
import { configLinksPrimaryBuy } from './primary/buy';
import { configLinksPrimaryCommercialRent } from './primary/commercial-rent';
import { configLinksPrimaryFindAgent } from './primary/find-agent';
import { configLinksPrimaryNewProjects } from './primary/new-projects';
import { configLinksPrimaryRent } from './primary/rent';
import { configLinksSecondaryAboutUs } from './secondary/about-us';
import { configLinksSecondaryCareers } from './secondary/careers';
import { configLinksSecondaryPoliticQuality } from './secondary/politic-quality';
import { configLinksSecondaryPrivacyPolicy } from './secondary/privacy-policy';
import { configLinksSecondaryTermsConditions } from './secondary/terms-conditions';

export const configLinksDefinition: ConfigLinksDefinitionInterface = {
  primary: [
    [configLinksPrimaryBuy, configLinksPrimaryRent, configLinksPrimaryCommercialRent],
    [configLinksPrimaryFindAgent, configLinksPrimaryNewProjects, configLinksPrimaryBlog],
  ],
  secondary: [
    [configLinksSecondaryAboutUs, configLinksSecondaryPrivacyPolicy],
    [configLinksSecondaryTermsConditions, configLinksSecondaryPoliticQuality, configLinksSecondaryCareers],
  ],
  iosDownloadLink: configLinksMobileAppIos,
  androidDownloadLink: configLinksMobileAppAndroid,
};