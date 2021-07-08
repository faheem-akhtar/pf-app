const withPreact = require("next-plugin-preact");
const { i18n } = require("./next-i18next.config");

module.exports = withPreact({
  i18n,
  distDir: process.env.NEXT_PUBLIC_MOBILE ? ".mobile.next" : ".desktop.next",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!process.env.NEXT_PUBLIC_MOBILE) {
        // All modules are considered as mobile first.
        // If desktop version requires different look/behavior it should create
        // A module override by creating a file with same name but different extension
        config.resolve.extensions.unshift('.desktop.ts', '.desktop.tsx');
    }
    return config;
  },
});
