import { AnyValueType } from 'types/any/value.type';

const original = global.React.useState;

export const mockReactUseState = (): void => {
  const useStateMock = (arg1: ((s: AnyValueType) => AnyValueType) | AnyValueType): AnyValueType => [
    typeof arg1 === 'function' ? (arg1 as Function)() : arg1,
    jest.fn(),
  ];

  jest.spyOn(global.React, 'useState').mockImplementation(useStateMock as jest.Mock);
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverReactUseState = (): void => {
  global.React.useState = original;
};
