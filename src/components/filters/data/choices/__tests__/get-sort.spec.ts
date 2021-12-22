import { filtersChoicesSortStub } from 'stubs/filters/choices/sort.stub';
import { filtersDataStub } from 'stubs/filters/data.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';

import { filtersDataChoicesGetSort } from '../get-sort';

describe('filtersDataChoicesGetSort()', () => {
  it('should not include delivery date earliest and latest', () => {
    expect(filtersDataChoicesGetSort(filtersValueStub(), filtersDataStub)).toEqual(filtersChoicesSortStub());
  });
});
