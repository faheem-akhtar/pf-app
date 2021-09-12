import { PropertyContactOptionsListInterface } from 'components/property/contact-options-list.interface';

export const contactOptionsEnabledStub: PropertyContactOptionsListInterface = {
  email: true,
  phone: {
    type: 'phone',
    value: '9999999',
    link: 'phone://9999999',
    is_did: false,
  },
};
