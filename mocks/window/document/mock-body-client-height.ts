/**
 * Mock body client height
 */
export const documentMockBodyClientHeight = (height: number): void => {
  jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => height);
};
