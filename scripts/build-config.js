const path = require('path');

const buildConfig = {
  /**
   * returns dist target for the given county-code and platform
   */
  getDistDir: () =>
    `dist/${
      process.env.NEXT_PUBLIC_MOBILE
        ? `.${process.env.NEXT_PUBLIC_COUNTRY_CODE}.mobile.next`
        : `.${process.env.NEXT_PUBLIC_COUNTRY_CODE}.desktop.next`
    }`,
  /**
   * Changes language string to path to language css file
   */
  getLanguageCssAlias: () => path.resolve('src/styles/common/language', `${process.env.NEXT_PUBLIC_LANG}.scss`),
};

module.exports = buildConfig;
