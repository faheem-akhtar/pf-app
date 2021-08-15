import { keywordsByCategory } from 'config/keywords/by-category';
import { stringMakeCaseInsensitiveTester } from 'helpers/string/make-case-insensitive-tester';

import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

const MAX_NUMBER_OF_KEYWORDS = 8;

export const keywordsMakeQueryForInputValue =
  (category: FiltersCategoryIdEnum) =>
  (inputValue: string): Promise<string[]> => {
    const searchResults = [];
    const matchesInputValueCaseInsensitive = stringMakeCaseInsensitiveTester(inputValue);

    for (const keyword of keywordsByCategory[category]) {
      if (matchesInputValueCaseInsensitive(keyword)) {
        searchResults.push(keyword);
        if (searchResults.length === MAX_NUMBER_OF_KEYWORDS) {
          break;
        }
      }
    }

    return Promise.resolve(searchResults);
  };
