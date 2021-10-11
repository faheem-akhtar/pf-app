/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { adConfigStub } from 'stubs/ad/config.stub';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { propertyStub } from 'stubs/property/stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { arrayFromRange } from 'helpers/array/from-range';

import { PropertyListComponent } from '../component';

describe('PropertyListComponent', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should render 3 ad placeholders in 0, 5, 21 positions', () => {
    const { getAllByTestId } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListComponent
          adConfig={adConfigStub()}
          properties={arrayFromRange(0, 25).map((i, index) => ({
            ...propertyStub(),
            [propertySerpObfuscatedFieldUrl]: `url-${index}`,
          }))}
          pageIsLoading={false}
        />
      </FiltersContextProvider>
    );

    const listItems = getAllByTestId('list-item');
    const adsIndexes = listItems
      .map((element, index) => {
        if (element.innerHTML.includes('data-ad')) {
          return index;
        }
        return null;
      })
      .filter((x) => x !== null);

    expect(listItems.length).toEqual(28);
    expect(adsIndexes).toEqual([0, 5, 21]);
  });

  it('should inject google tag script', () => {
    render(<PropertyListComponent adConfig={adConfigStub()} properties={[]} pageIsLoading={false} />);

    const gptScript =
      '<script type="text/javascript" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>';
    expect(document.head.innerHTML).toContain(gptScript);
  });
});
