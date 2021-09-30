import { SaveSearchPayloadFilterKeysEnum } from 'enums/save-search/payload-filter-keys.enum';

import { saveSearchFilterEquality } from '../filter-equality';

describe('saveSearchFilterEquality', () => {
  it('should return true if filters are equals', () => {
    expect(
      saveSearchFilterEquality(
        {
          [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 10,
        },
        {
          [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 10,
        }
      )
    ).toBeTruthy();

    expect(
      saveSearchFilterEquality(
        {
          [SaveSearchPayloadFilterKeysEnum.LOCATION_IDS]: ['1', '2'],
        },
        {
          [SaveSearchPayloadFilterKeysEnum.LOCATION_IDS]: ['2', '1'],
        }
      )
    ).toBeTruthy();
    expect(
      saveSearchFilterEquality(
        {
          [SaveSearchPayloadFilterKeysEnum.MIN_PRICE]: 10000,
          [SaveSearchPayloadFilterKeysEnum.PRICE_TYPE]: 'monthly',
        },
        {
          [SaveSearchPayloadFilterKeysEnum.PRICE_TYPE]: 'MONTHLY',
          [SaveSearchPayloadFilterKeysEnum.MIN_PRICE]: 10000,
        }
      )
    ).toBeTruthy();
  });
  it('should return false if filters are not equals', () => {
    expect(
      saveSearchFilterEquality(
        {
          [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 10,
        },
        {
          [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 11,
        }
      )
    ).toBeFalsy();
  });
});
