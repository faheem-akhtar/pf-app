import { ApiSwrFactory } from 'api/swr-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { CountrySortEnum } from 'enums/country/sort.enum';
import { CountryPhoneCodesInterface } from 'library/input/phone-number/country/phone-codes.interface';

export const useApiCountryPhoneCodes = (sort?: CountrySortEnum): ApiSwrResultType<CountryPhoneCodesInterface[]> =>
  ApiSwrFactory<CountryPhoneCodesInterface[], CountryPhoneCodesInterface[]>({
    method: 'GET',
    url: 'countries',
    dataMapper: (data: CountryPhoneCodesInterface[]) => {
      return data.map((country) => {
        return {
          code: country.code,
          name: country.name,
          phoneCode: `+${country.phoneCode}`,
        };
      });
    },
  })({ query: { sort } });
