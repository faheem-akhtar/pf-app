import { BackendModelPropertyCategoryIdentifierEnum } from 'backend/model/property/category-identifier.enum';
import { BackendModelPropertyInterface } from 'backend/model/property/interface';

import { propertyAgentStub } from './agent.stub';
import { propertyBrokerStub } from './broker.stub';

export const propertyBackendStub = (
  data: Partial<BackendModelPropertyInterface> = {}
): BackendModelPropertyInterface => ({
  links: {
    self: 'https://www.propertyfinder.ae/en/rent/apartment-for-rent-abu-dhabi-khalifa-city-khalifa-city-a-7750053.html',
    self_alternate:
      'https://www.propertyfinder.ae/ar/%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1/%D8%B4%D9%82%D8%A9-%D9%84%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1-%D8%A3%D8%A8%D9%88%D8%B8%D8%A8%D9%8A-%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D8%AE%D9%84%D9%8A%D9%81%D8%A9-a-%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D8%AE%D9%84%D9%8A%D9%81%D8%A9-7750053.html',
    image_property:
      'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/500/356/MODE/2627b3/7750053-d109eo.jpg?ctr=ae',
    image_property_homepage:
      'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/338/248/MODE/951543/7750053-d109eo.jpg?ctr=ae',
    image_property_small:
      'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/260/185/MODE/e66787/7750053-d109eo.jpg?ctr=ae',
    image_property_medium:
      'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/668/452/MODE/33635d/7750053-d109eo.jpg?ctr=ae',
    image_broker: 'https://www.propertyfinder.ae/broker/1/178/98/MODE/85bdb1/2867-logo.jpg?ctr=ae',
  },
  meta: {
    subtitle: 'Apartment for Rent in Khalifa City A, Khalifa City',
    price: 3300,
    price_text: '3,300 AED/month',
    contact_options: {
      app: {
        phone: { type: 'phone', value: '+971552273878', link: 'tel:+971552273878', is_did: false },
        email: { type: 'email', value: 'dummy@propertyfinder.ae', link: 'mailto:dummy@propertyfinder.ae' },
        whatsapp: {
          type: 'whatsapp',
          value: '+971552273878',
          link: 'whatsapp://send?phone=971552273878&text=Hello,%0aI would like to get more information about this property you posted on propertyfinder.ae:%0a%0aReference: FURNISH+33K%0aType: Apartment%0aPrice: 3300 AED/month%0aLocation: Khalifa City A%0a%0aLink: https://www.propertyfinder.ae/en/rent/apartment-for-rent-abu-dhabi-khalifa-city-khalifa-city-a-7750053.html',
        },
        sms: { type: 'sms', value: '+971552273878', link: 'sms:+971552273878' },
      },
    },
    images_count: 10,
    live_event_metadata: null,
    listed_at_message: 'more than 6 months ago',
  },
  id: '7750053',
  name: 'Family Community Furnish Studio/3300 M W/Markert',
  area: '650 sqft',
  size: 650,
  size_unit: 'sqft',
  price_period_label: 'Monthly',
  price_period_identifier: 'monthly',
  offering_type: 'Residential for Rent',
  offering_type_id: '2',
  premium: false,
  verified: false,
  featured: false,
  furnished: 'YES',
  reference: 'FURNISH 33K',
  rera: '',
  price_on_application: false,
  default_price: 3300,
  category_id: '2',
  category_identifier: BackendModelPropertyCategoryIdentifierEnum.residentialForRent,
  type_id: '1',
  type_identifier: 'apartment',
  smart_ad: false,
  cts: false,
  listing_level_label: 'standard',
  listing_level: 'standard',
  bathroom_value: 1,
  bathroom_name: '1',
  bedroom_value: 0,
  bedroom_name: 'studio',
  location_tree_path: 'Khalifa City A, Khalifa City, Abu Dhabi',
  quality_score: 100,
  view_360: '',
  rsp: 89.69,
  rss: 61.19,
  coordinates: { lat: 24.423449, lon: 54.578697 },
  completion_status: null,
  is_expired: false,
  utilities_price_type: 'exclusive',
  date_insert: '2020-10-05T06:23:34+00:00',
  exclusive: false,
  share_url:
    'https://www.propertyfinder.ae/en/rent/apartment-for-rent-abu-dhabi-khalifa-city-khalifa-city-a-7750053.html',
  new_projects: false,
  property_type: {
    id: '1',
    name: 'Apartment',
  },
  property_images: [
    {
      links: {
        homepage:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/338/248/MODE/951543/7750053-d109eo.jpg?ctr=ae',
        cts: 'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/668/452/MODE/33635d/7750053-d109eo.jpg?ctr=ae',
        small:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/260/185/MODE/e66787/7750053-d109eo.jpg?ctr=ae',
        medium:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/668/452/MODE/33635d/7750053-d109eo.jpg?ctr=ae',
        thumb:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/95/95/MODE/d498c2/7750053-d109eo.jpg?ctr=ae',
        new_big:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/856/550/MODE/a6b63d/7750053-d109eo.jpg?ctr=ae',
        new_small:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/416/272/MODE/53b71e/7750053-d109eo.jpg?ctr=ae',
        full_screen:
          'https://www.propertyfinder.ae/property/3656619107f9c0c1f5eb8ae1539b9c81/1312/894/MODE/a61eba/7750053-d109eo.jpg?ctr=ae',
      },
      id: '129068569',
      path: '7750053-d109eo.jpg',
      number: 1,
      version: '3656619107f9c0c1f5eb8ae1539b9c81',
      is_default: true,
    },
    {
      links: {
        homepage:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/338/248/MODE/2ced06/7750053-ce5aco.jpg?ctr=ae',
        cts: 'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/668/452/MODE/e7ed0f/7750053-ce5aco.jpg?ctr=ae',
        small:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/260/185/MODE/f59cb0/7750053-ce5aco.jpg?ctr=ae',
        medium:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/668/452/MODE/e7ed0f/7750053-ce5aco.jpg?ctr=ae',
        thumb:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/95/95/MODE/465971/7750053-ce5aco.jpg?ctr=ae',
        new_big:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/856/550/MODE/c1b74d/7750053-ce5aco.jpg?ctr=ae',
        new_small:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/416/272/MODE/291ef5/7750053-ce5aco.jpg?ctr=ae',
        full_screen:
          'https://www.propertyfinder.ae/property/f84cc9c74ad62066f6aa33e6bd55b4aa/1312/894/MODE/01928e/7750053-ce5aco.jpg?ctr=ae',
      },
      id: '129068570',
      path: '7750053-ce5aco.jpg',
      number: 2,
      version: 'f84cc9c74ad62066f6aa33e6bd55b4aa',
      is_default: false,
    },
  ],
  location_tree: [
    {
      links: {},
      id: '6',
      name: 'Abu Dhabi',
      path: '6',
      path_name: '',
      location_type: 'CITY',
      review_score: 3.738706,
      reviews_count: 117,
      coordinates: { lon: 54.378304, lat: 24.455312 },
      level: 0,
      abbreviation: '',
      url_slug: 'abu-dhabi',
      children_count: 1108,
    },
    {
      links: {},
      id: '299',
      name: 'Khalifa City',
      path: '6.299',
      path_name: 'Abu Dhabi',
      location_type: 'COMMUNITY',
      review_score: 4.2142854,
      reviews_count: 8,
      coordinates: { lon: 54.576601, lat: 24.421554 },
      level: 1,
      abbreviation: '',
      url_slug: 'khalifa-city',
      children_count: 18,
    },
    {
      links: { building_reviews: '/en/building-reviews/abu-dhabi/khalifa-city-khalifa-city-a.html' },
      id: '1933',
      name: 'Khalifa City A',
      path: '6.299.1933',
      path_name: 'Abu Dhabi, Khalifa City',
      location_type: 'SUBCOMMUNITY',
      review_score: 3.142857,
      reviews_count: 2,
      coordinates: { lon: 54.578697, lat: 24.423449 },
      level: 2,
      abbreviation: '',
      url_slug: 'khalifa-city-khalifa-city-a',
      children_count: 0,
    },
  ],
  agent: propertyAgentStub(),
  broker: propertyBrokerStub(),
  ...data,
});
