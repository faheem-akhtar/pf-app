import { SWRResponse } from 'swr';

import { ApiSwrResultType } from 'api/swr-result-type';
import { AnyValueType } from 'types/any/value.type';

let mocksMap: Record<string, { swrResultData: Partial<ApiSwrResultType<AnyValueType>>; swrIsValidating: boolean }> = {};

export const mockReactUseSwr = (
  key: string,
  swrResultData: Partial<ApiSwrResultType<AnyValueType>>,
  swrIsValidating: boolean = false
): void => {
  mocksMap[key] = { swrResultData, swrIsValidating };
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const setupSwrMock = (): void => {
  jest.mock('swr', () => (key: string | void): SWRResponse<AnyValueType, AnyValueType> => {
    const baseProps = {
      data: null,
      isValidating: true,
      revalidate: (): Promise<boolean> => Promise.resolve(true),
      mutate: (): Promise<null> => Promise.resolve(null),
    };
    if (key) {
      if (!mocksMap[key]) {
        throw new Error(`Swr with key ${key} is not mocked`);
      }

      return {
        ...baseProps,
        data: mocksMap[key].swrResultData,
        isValidating: mocksMap[key].swrIsValidating,
      };
    }
    return baseProps;
  });
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const mockReactUseSwrRecover = (): void => {
  mocksMap = {};
};
