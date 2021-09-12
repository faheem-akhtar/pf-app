// eslint-disable-next-line pf-rules/export-name-validation
export const translationsMap: Record<string, string> = {};

export const mockMiscAddTranslation = (key: string, translation: string): void => {
  translationsMap[key] = translation;
};
