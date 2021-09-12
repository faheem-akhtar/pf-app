import * as importScriptModule from 'helpers/import/script';

const original = importScriptModule.importScript;

export const mockWindowImportScript = (): {
  spy: jest.SpyInstance<Promise<void>>;
  promise: Promise<void>;
} => {
  const promise = Promise.resolve();
  return {
    spy: jest.spyOn(importScriptModule, 'importScript').mockReturnValue(promise),
    promise,
  };
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverWindowMockImportScript = (): void => {
  Object.defineProperty(importScriptModule, 'importScript', original);
};
