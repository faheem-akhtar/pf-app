import { CountryPhoneCodesInterface } from 'types/country-phone-codes/interface';

export const countryPhoneCodesStub = (data: Partial<CountryPhoneCodesInterface> = {}): CountryPhoneCodesInterface => ({
  code: 'ae',
  name: 'United Arab Emirates',
  phoneCode: '+971',
  ...data,
});
