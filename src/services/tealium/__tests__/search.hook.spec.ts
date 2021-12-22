import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { filtersDataStub } from 'stubs/filters/data.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertyStub } from 'stubs/property/stub';
import { tealiumServiceStub } from 'stubs/tealium/service.stub';

import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

import { useServicesTealiumSearch } from '../search.hook';

describe('useServicesTealiumSearch()', () => {
  const tealiumStub = tealiumServiceStub();

  beforeEach(() => {
    window.utag = tealiumStub;
    window.tealium = { page_type: 'page_type' };
    mockReactUseEffect();
  });

  test('if page is not rendered, onPageViewRendered should not be called', () => {
    useServicesTealiumSearch({ ok: false, error: 'error' });
    expect(tealiumStub.onPageViewRendered).not.toHaveBeenCalled();
  });

  test('if page is rendered, onPageViewRendered should be called with correct payload', () => {
    useServicesTealiumSearch({
      ok: true,
      filtersData: filtersDataStub(),
      filtersValueFromQuery: filtersValueStub(),
      searchResult: { total: 5, properties: [propertyStub()] },
    } as PropertySearchViewPropsType);

    expect(window.utag.view).toHaveBeenCalledTimes(1);
  });
});
