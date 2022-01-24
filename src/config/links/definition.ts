import { ConfigLinksDefinitionInterface } from './definition.interface';
import { configLinksMobileAppAndroid } from './mobile-app/android';
import { configLinksMobileAppHuawei } from './mobile-app/huawei';
import { configLinksMobileAppIos } from './mobile-app/ios';
import { configLinksPrimaryBuy } from './primary/buy';
import { configLinksPrimaryCommercialRent } from './primary/commercial-rent';
import { configLinksPrimaryFindAgent } from './primary/find-agent';
import { configLinksPrimaryNewProjects } from './primary/new-projects';
import { configLinksPrimaryRent } from './primary/rent';
import { configLinksSecondaryAboutUs } from './secondary/about-us';
import { configLinksSecondaryAdvertise } from './secondary/advertise';
import { configLinksSecondaryCareers } from './secondary/careers';
import { configLinksSecondaryClientLogin } from './secondary/client-login';
import { configLinksSecondaryMortgageFinder } from './secondary/mortgage-finder';
import { configLinksSecondaryPrivacyPolicy } from './secondary/privacy-policy';
import { configLinksSecondaryTermsConditions } from './secondary/terms-conditions';

export const configLinksDefinition: ConfigLinksDefinitionInterface = {
  primary: [
    [configLinksPrimaryBuy, configLinksPrimaryRent, configLinksPrimaryCommercialRent],
    [configLinksPrimaryNewProjects, configLinksPrimaryFindAgent],
  ],
  secondary: [
    [configLinksSecondaryAboutUs, configLinksSecondaryPrivacyPolicy, configLinksSecondaryClientLogin],
    [
      configLinksSecondaryTermsConditions,
      configLinksSecondaryAdvertise,
      configLinksSecondaryMortgageFinder,
      configLinksSecondaryCareers,
    ],
  ],
  iosDownloadLink: configLinksMobileAppIos,
  androidDownloadLink: configLinksMobileAppAndroid,
  huaweiDownloadLink: configLinksMobileAppHuawei,
};
