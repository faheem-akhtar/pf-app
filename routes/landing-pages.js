const categoryRegex = `commercial|commercial-rent|commercial-buy|rent|buy|${encodeURI('للإجار')}|${encodeURI(
  'تجارية-للايجار'
)}|${encodeURI('تجارية')}|${encodeURI('تجارية-للايجار')}|${encodeURI('للبيع')}|${encodeURI('تجارية-للبيع')}|${encodeURI(
  'للايجار'
)}|${encodeURI('تجارية-للايجار')}|${encodeURI('تجاري')}`;
const cityRegex = '[%a-zA-Z0-9+_-]+';
const furnishRegex = `furnished|${encodeURI('مفروشة')}`;
const bedroomRegex = `[1-7]-bedroom|studio|${encodeURI('استوديو')}|[1-7]-${encodeURI('غرفة-نوم')}`;
const propertyTypeRegex = '[%a-zA-Z0-9+_-]+';
const saleTypeRegex = `for-rent|for-sale|${encodeURI('للايجار')}|${encodeURI('للإجار')}|${encodeURI('للبيع')}`;
const priceTypeRegex = `monthly|${encodeURI('شهري')}`;
const locationSlugRegex = '[%a-zA-Z0-9+_-]+';

module.exports = [
  // /en/buy/dubai/furnished-studio-apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/furnished-studio-apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/dubai/studio-apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/studio-apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/dubai/furnished-1-bedroom-apartments-for-rent-jumeirah-village-circle-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/furnished-1-bedroom-apartments-for-sale-jumeirah-village-circle.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex}).html`,

  // /en/buy/dubai/1-bedroom-apartments-for-rent-jumeirah-village-circle-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/1-bedroom-apartments-for-sale-jumeirah-village-circle.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex}).html`,

  // /en/buy/dubai/furnished-apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/furnished-apartments-for-rent-jumeirah-village-circle-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/apartments-for-rent-jumeirah-village-circle-monthly.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/dubai/furnished-apartments-for-sale-jumeirah-village-circle.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex}).html`,

  // /en/buy/dubai/furnished-apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/dubai/apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/dubai/apartments-for-sale-jumeirah-village-circle.html
  `/:categorySlug(${categoryRegex})/:citySlug(${cityRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:locationSlug(${locationSlugRegex}).html`,

  // /en/rent/furnished-1-bedroom-properties-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/rent/furnished-1-bedroom-properties-for-rent.html
  `/:categorySlug(${categoryRegex})/:furnishSlug(${furnishRegex})-:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/rent/1-bedroom-properties-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/rent/1-bedroom-properties-for-rent.html
  `/:categorySlug(${categoryRegex})/:bedroomSlug(${bedroomRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/furnished-apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/furnished-apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:furnishSlug(${furnishRegex})-:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,

  // /en/buy/apartments-for-rent-monthly.html
  `/:categorySlug(${categoryRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex})-:priceType(${priceTypeRegex}).html`,

  // /en/buy/apartments-for-sale.html
  `/:categorySlug(${categoryRegex})/:propertyTypeSlug(${propertyTypeRegex})-:saleType(${saleTypeRegex}).html`,
].reduce((acc, source) => {
  const matches = source.matchAll(/:([a-z]+)\(/gi);
  const pattern = source.replace(/(\(.*?\))/g, '').replace(/:/g, '');
  const query = [];

  for (const match of matches) {
    query.push(`${match[1]}=:${match[1]}`);
  }

  query.push(`pattern=${encodeURIComponent(pattern)}`);

  acc[source] = {
    // pass the parameters in the query
    destination: `/search?${query.join('&')}`,
  };

  return acc;
}, {});
