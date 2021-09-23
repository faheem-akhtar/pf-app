import { keywordsByCategory } from 'config/keywords/by-category';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { keywordsMakeQueryForInputValue } from '../make-query-for-input-value';

describe('keywordsMakeQueryForInputValue', () => {
  const keywordsQueryForInputValue = keywordsMakeQueryForInputValue(
    FiltersCategoryIdEnum.residentialForRent,
    keywordsByCategory
  );

  it('returns 0 suggestions for empty string', async () => {
    const result = await keywordsQueryForInputValue('');

    expect(result.length).toBe(0);
  });

  it('returns 0 suggestions for adfasfojan', async () => {
    const result = await keywordsQueryForInputValue('adfasfojan');

    expect(result.length).toBe(0);
  });
});
