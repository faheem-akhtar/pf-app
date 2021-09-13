import { configCommon } from 'config/common';
import { CountryPhoneCodesInterface } from 'types/country-phone-codes/interface';

/**
 * Returns default country config or selected
 *
 * @param value string
 * @param countryList CountryPhoneCodesInterface[]
 */
export const phoneNumberCountryGetConfig = (
  value: string,
  countryList: CountryPhoneCodesInterface[]
): CountryPhoneCodesInterface => {
  if (value === '') {
    return countryList.find((country) => country.code === configCommon.countryCode) as CountryPhoneCodesInterface;
  }

  return countryList.find((country) => value.includes(country.phoneCode)) as CountryPhoneCodesInterface;
};
