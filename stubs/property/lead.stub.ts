import { userModelStub } from 'stubs/user/model.stub';

import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

const user = userModelStub();

export const propertyLeadStub = (): PropertyLeadAttributesInterface => ({
  name: `${user.first_name} ${user.last_name}`,
  email: `${user.email}`,
  phone: '+97155555555',
  message: 'Hi, I found your property with ref: 123 on Property Finder. Please contact me. Thank you.',
});
