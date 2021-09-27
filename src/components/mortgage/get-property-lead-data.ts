import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

/**
 * Returns property lead data params for mortgage finder widgets
 */
export const mortgageGetPropertyLeadData = ({
  name,
  phone,
  email,
}: PropertyLeadAttributesInterface): { ud: string } | void => ({
  ud: btoa(
    JSON.stringify({
      fullname: name || undefined,
      phone_number: phone || undefined,
      email_address: email || undefined,
    })
  ),
});
