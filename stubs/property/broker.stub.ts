import { BackendModelBrokerClientTypeEnum } from 'backend/model/broker/client-type.enum';
import { BackendModelBrokerInterface } from 'backend/model/broker/interface';

export const propertyBrokerStub = (data: Partial<BackendModelBrokerInterface> = {}): BackendModelBrokerInterface => ({
  links: {
    profile: '/en/broker/moon-star-real-estate-2867',
    logo_178_98: 'https://www.propertyfinder.ae/broker/1/178/98/MODE/85bdb1/2867-logo.jpg?ctr=ae',
    logo_desktop:
      'https://www.propertyfinder.ae/images/pf_broker/logo/e8c53693161e54c3e9ad8323a42bfde834959952/desktop',
  },
  id: '2867',
  name: 'Moon Star Real Estate',
  phone: '+971552273878',
  ranking: 32.97,
  url_slug: 'moon-star-real-estate',
  logo_token: 'e8c53693161e54c3e9ad8323a42bfde834959952',
  address: 'Mussafah 13, 92 office 6',
  license_label: 'License',
  license_number: 'CN - 2332181',
  location_name: 'Abu Dhabi',
  transactions_count: 0,
  agents: 0,
  total_properties: 189,
  properties_residential_for_rent_count: 0,
  properties_residential_for_sale_count: 0,
  properties_commercial_count: 0,
  client_type: BackendModelBrokerClientTypeEnum.broker,
  ...data,
});
