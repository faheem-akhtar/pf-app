import { AnyValueType } from 'types/any/value.type';

const original = global.React.useContext;

export const mockReactUseContext = (...contextsValues: AnyValueType[]): void => {
  let callNumber = 0;
  jest.spyOn(global.React, 'useContext').mockImplementation(() => {
    if (callNumber === contextsValues.length) {
      throw new Error(`useContext was called for ${callNumber + 1} time, but mock context value was not specified.`);
    }
    return contextsValues[callNumber++];
  });
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const recoverReactUseContext = (): void => {
  global.React.useContext = original;
};
