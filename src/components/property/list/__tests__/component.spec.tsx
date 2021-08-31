/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { AdConfigMock } from 'mocks/ad-config/mock';
import { PropertyListComponent } from '../component';
import { PropertyMock } from 'mocks/property/mock';

import { arrayFromRange } from 'helpers/array/from-range';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';

describe('PropertyListComponent', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should render 3 ad placeholders in 0, 5, 21 positions', () => {
    const { getAllByTestId } = render(
      <PropertyListComponent
        adConfig={AdConfigMock()}
        properties={arrayFromRange(0, 25).map((i, index) => ({
          ...PropertyMock(),
          [propertySerpObfuscatedFieldUrl]: `url-${index}`,
        }))}
        pageIsLoading={false}
      />
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
    render(<PropertyListComponent adConfig={AdConfigMock()} properties={[]} pageIsLoading={false} />);

    const gptScript =
      '<script type="text/javascript" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>';
    expect(document.head.innerHTML).toContain(gptScript);
  });
});