import { ConfigLinksDefinitionInterface } from './definition.interface';
import { configLinksFindAgentUrlPath } from './find-agent-url-path';

// TODO-FE[TPNX-3038] [MDOT] Define links for all countries
export const configLinksDefinition: ConfigLinksDefinitionInterface = {
  primary: [
    {
      translationKey: 'buy',
      urlPath: '/buy/properties-for-sale.html',
    },
    {
      translationKey: 'new_projects',
      urlPath: '/new-projects',
    },
    {
      translationKey: 'rent',
      urlPath: '/rent/properties-for-rent.html',
    },

    {
      translationKey: 'find_agent',
      urlPath: configLinksFindAgentUrlPath,
    },
    {
      translationKey: 'commercial_rent',
      urlPath: '/commercial-rent/properties-for-rent.html',
    },
  ],
  secondary: [
    {
      translationKey: 'about_us',
      urlPath: '/about-us.html',
    },
    {
      translationKey: 'privacy_policy',
      urlPath: '/privacy-policy.html',
    },
    {
      translationKey: 'client_login',
      urlPath: '/manager',
    },
    {
      translationKey: 'terms_conditions',
      urlPath: '/terms-and-conditions.html',
    },
  ],
  iosDownloadLink: '',
  androidDownloadLink: '',
};
