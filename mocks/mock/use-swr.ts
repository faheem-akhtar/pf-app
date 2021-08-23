import { mockFetch } from './fetch';

import { AnyValueType } from 'types/any/value.type';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SWRResponse } from 'swr';

let resultData: Partial<ApiSwrResultType<AnyValueType>>;
let isValidating = false;

export const mockUseSwr = (
  swrResultData: Partial<ApiSwrResultType<AnyValueType>>,
  swrIsValidating: boolean = false
): void => {
  resultData = swrResultData;
  isValidating = swrIsValidating;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const setupSwrMock = (): void => {
  jest.mock('swr', () => (shouldFetch: boolean, fetcher: Function): SWRResponse<AnyValueType, AnyValueType> => {
    const baseProps = {
      data: null,
      isValidating: true,
      revalidate: (): Promise<boolean> => Promise.resolve(true),
      mutate: (): Promise<null> => Promise.resolve(null),
    };
    if (shouldFetch) {
      mockFetch();
      fetcher();
      return {
        ...baseProps,
        data: resultData,
        isValidating,
      };
    }
    return baseProps;
  });
};
