/**
 * @jest-environment jsdom
 */

import { render, RenderResult, screen } from '@testing-library/react';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { propertyLeadStub } from 'stubs/property/lead.stub';
import { propertyStub } from 'stubs/property/stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { propertySerpObfuscatedGetDefaultPrice } from 'components/property/serp/obfuscated/get/default-price';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { MortgageCampaignComponent } from '../component';
import { MortgageCampaignComponentPropsInterface } from '../component-props.interface';

describe('MortgageCampaignComponent', () => {
  let renderResult: RenderResult;
  let props: MortgageCampaignComponentPropsInterface;
  const property: PropertySerpObfuscatedType = propertyStub();

  beforeAll(() => {
    props = {
      property: {
        defaultPrice: propertySerpObfuscatedGetDefaultPrice(property),
        id: propertySerpObfuscatedGetId(property),
        reference: propertySerpObfuscatedGetReference(property),
      },
      leadModel: propertyLeadStub(),
    };
  });

  it('should not render when the category ids are rental', () => {
    const { container } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <MortgageCampaignComponent {...props} />
      </FiltersContextProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  describe('when category ids are sale', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();

    beforeEach(() => {
      renderResult = render(
        <FiltersContextProvider
          filtersValueFromQuery={{
            ...filtersValueFromQuery,
            [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.commercialForSale,
          }}
          filtersData={filtersData}
        >
          <MortgageCampaignComponent {...props} />
        </FiltersContextProvider>
      );
    });

    it('should render without throwing any errors', () => {
      expect(renderResult.container).toMatchSnapshot();
    });

    it('should button link create', () => {
      const button = screen.getByRole('link', { name: 'agent-modal/mortgage-campaign-cta-label' });
      const mortgageFinderUrl =
        'https://www.mortgagefinder.ae/r?lang=en&propertyvalue=100000&reference=123&propertyId=198023&utm_source=propertyfinder-mobile&utm_medium=popup&utm_campaign=commercial-finance&utm_content=get-pre-approved&ud=eyJmdWxsbmFtZSI6IkZpcnN0TmFtZSBMYXN0TmFtZSIsInBob25lX251bWJlciI6Iis5NzE1NTU1NTU1NSIsImVtYWlsX2FkZHJlc3MiOiJ0ZXN0QHByb3BlcnR5ZmluZGVyLmFlIn0%3D';

      expect(button).toHaveAttribute('href', mortgageFinderUrl);
    });
  });
});
