const path = require('path');
const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE?.toLowerCase();
// Default locale should be updated once we migrate to Next.js 12 by using Middleware.
const defaultLocale = {
  ae: 'en',
  sa: 'ar',
  eg: 'ar',
  bh: 'en',
  qa: 'en',
  lb: 'en',
  ma: 'fr',
};

module.exports = {
  i18n: {
    locales: ['en', 'ar', 'fr', '_'],
    defaultLocale: defaultLocale[countryCode] || '_',
  },
  localePath: path.resolve('./public/static/translations'),
  react: {
    useSuspense: false,
    wait: true,
  },
  compatibilityJSON: 'v3',
};
