// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const translationsMap: Record<string, string> = {};

export const mockMiscAddTranslation = (key: string, translation: string): void => {
  translationsMap[key] = translation;
};
