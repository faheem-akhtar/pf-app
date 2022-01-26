import { PropertyLeadInterface } from 'components/property/lead.interface';

/**
 * Returns property lead data params for mortgage finder widgets
 */
export const mortgageGetPropertyLeadData = ({ name, phone, email }: PropertyLeadInterface): { ud: string } | void => ({
  ud: btoa(
    JSON.stringify({
      fullname: name || undefined,
      phone_number: phone || undefined,
      email_address: email || undefined,
    })
  ),
});
