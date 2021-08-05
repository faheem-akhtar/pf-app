import { AnyValueType } from 'types/any/value.type';
import { SWRResponse } from 'swr';

let result: AnyValueType = null;

export const mockUseSwr = (swrResult: AnyValueType): void => {
  result = swrResult;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const setupSwrMock = (): void => {
  jest.mock('swr', () => (shouldFetch: boolean): SWRResponse<AnyValueType, AnyValueType> => {
    const baseProps = {
      data: null,
      isValidating: true,
      revalidate: (): Promise<boolean> => Promise.resolve(true),
      mutate: (): Promise<null> => Promise.resolve(null),
    };
    if (shouldFetch) {
      return {
        ...baseProps,
        data: { ok: true, data: result },
        isValidating: false,
      };
    }
    return baseProps;
  });
};
