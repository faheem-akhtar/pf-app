import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import { backendApiPropertyStatsDataFetcher } from '../fetcher';

describe('backendApiPropertyStatsDataFetcher', () => {
  it('should create correct url query', () => {
    const fetchMock = mockWindowFetch({ json: () => Promise.resolve(propertiesRawBackendStub()) });
    backendApiPropertyStatsDataFetcher({
      locale: 'en',
      propertiesIds: ['1', '2'],
      pageNumber: 30,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://website-pf-local/en/api/search?filter%5Bids%5D%5B%5D=1&filter%5Bids%5D%5B%5D=2&page%5Blimit%5D=2&include=properties%2Cproperties.property_type%2Cproperties.property_images%2Cproperties.location_tree%2Cproperties.agent%2Cproperties.agent.languages%2Cproperties.broker%2Cproperties.project%2Cproperties.project.developer%2Cproperties.project.images%2Cproperties.project_property%2Cproperties.project_property.unit%2Cproperties.project_property.unit.floor_plans%2Csmart_ads%2Csmart_ads.agent%2Csmart_ads.broker%2Csmart_ads.property_type%2Csmart_ads.property_images%2Csmart_ads.location_tree%2Cdirect_from_developer%2Cdirect_from_developer.property_type%2Cdirect_from_developer.property_images%2Cdirect_from_developer.location_tree%2Cdirect_from_developer.agent%2Cdirect_from_developer.broker%2Ccts%2Ccts.agent%2Ccts.broker%2Ccts.property_type%2Ccts.property_images%2Ccts.location_tree%2Csimilar_properties%2Csimilar_properties.agent%2Csimilar_properties.broker%2Csimilar_properties.property_type%2Csimilar_properties.property_images%2Csimilar_properties.location_tree%2Cagent_smart_ads%2Cagent_smart_ads.broker%2Cagent_smart_ads.languages%2Cagent_properties_smart_ads%2Cagent_properties_smart_ads.agent%2Cagent_properties_smart_ads.broker%2Cagent_properties_smart_ads.location_tree%2Cagent_properties_smart_ads.property_type%2Cagent_properties_smart_ads.property_images',
      expect.anything()
    );
  });

  it('should map data correctly and obfuscate the keys', async () => {
    mockWindowFetch({ json: () => Promise.resolve(propertiesRawBackendStub()) });
    const result = await backendApiPropertyStatsDataFetcher({
      locale: 'en',
      propertiesIds: ['1', '2'],
      pageNumber: 30,
    });

    expect(result.ok).toBeTruthy();
    if (result.ok) {
      expect(result.data.properties).toMatchSnapshot();
    }
  });
});
