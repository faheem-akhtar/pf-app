const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'ar', 'fr', '_'],
    defaultLocale: '_',
  },
  localePath: path.resolve('./public/static/translations'),
  react: {
    useSuspense: false,
    wait: true,
  },
};
