const withPreact = require('next-plugin-preact');
const { i18n } = require('./next-i18next.config');
const { getLanguageCssAlias } = require('./scripts/build-config');
const buildConfig = require('./scripts/build-config');

module.exports = withPreact({
  i18n,
  distDir: buildConfig.getDistDir(),
  webpack: (config) => {
    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE.toLowerCase();
    config.resolve.extensions.unshift(`.${countryCode}.ts`, `.${countryCode}.tsx`);

    config.resolve.alias['~language'] = getLanguageCssAlias();

    if (!process.env.NEXT_PUBLIC_MOBILE) {
      // All modules are considered as mobile first.
      // If desktop version requires different look/behavior it should create
      // A module override by creating a file with same name but different extension
      config.resolve.extensions.unshift(
        `.${countryCode}.desktop.ts`,
        `.${countryCode}.desktop.tsx`,
        '.desktop.ts',
        '.desktop.tsx'
      );
    }

    return config;
  },
});
