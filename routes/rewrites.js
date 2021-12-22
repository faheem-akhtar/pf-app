const landingPageRoutes = require('./landing-pages');

const searchRewrites = Object.keys(landingPageRoutes).map((source) => ({
  source,
  destination: landingPageRoutes[source].destination,
}));

module.exports = searchRewrites;
