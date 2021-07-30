/**
 * Mock body client height
 */
export const mockDocumentBodyClientHeight = (height: number): void => {
  jest.spyOn(document.body, 'clientHeight', 'get').mockImplementation(() => height);
};
