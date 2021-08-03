const original = global.React.useReducer;

export const mockUseReducer = <State>(
  state: State
): {
  useReducerMock: jest.Mock<State>;
  dispatchMock: jest.Mock;
} => {
  const useReducerMock = jest.fn();
  const dispatchMock = jest.fn();
  useReducerMock.mockReturnValue([state, dispatchMock]);
  jest.spyOn(global.React, 'useReducer').mockImplementation(useReducerMock);

  return {
    useReducerMock,
    dispatchMock,
  };
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverUseReducer = (): void => {
  global.React.useReducer = original;
};
