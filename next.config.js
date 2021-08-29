const { i18n } = require('./next-i18next.config');
const { getLanguageCssAlias } = require('./scripts/build-config');
const buildConfig = require('./scripts/build-config');

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n,
  distDir: buildConfig.getDistDir(),
  webpack: (config) => {
    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE.toLowerCase();
    config.resolve.extensions.unshift(`.${countryCode}.ts`, `.${countryCode}.tsx`, `.${countryCode}.json`);

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
  compress: false,
  async headers() {
    return [
      {
        // cache for 10 years
        source: '/api/pwa/location/list',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=315360000, s-maxage=315360000, stale-while-revalidate=315360000',
          },
        ],
      },
    ];
  },
};
