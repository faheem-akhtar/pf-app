import { configKeywordsMaxWordLimit } from 'config/keywords/max-word-limit';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { stringMakeCaseInsensitiveTester } from 'helpers/string/make-case-insensitive-tester';

export const keywordsMakeQueryForInputValue =
  (category: FiltersCategoryIdEnum, keywords: Record<FiltersCategoryIdEnum, string[]>) =>
  (inputValue: string): Promise<string[]> => {
    const searchResults = [];
    const matchesInputValueCaseInsensitive = stringMakeCaseInsensitiveTester(inputValue);

    for (const keyword of keywords[category]) {
      if (matchesInputValueCaseInsensitive(keyword)) {
        searchResults.push(keyword);
        if (searchResults.length === configKeywordsMaxWordLimit) {
          break;
        }
      }
    }

    return Promise.resolve(searchResults);
  };
