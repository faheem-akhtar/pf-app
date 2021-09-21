import { propertyBackendStub } from 'stubs/property/backend.stub';

import { BackendModelPropertyCategoryIdentifierEnum } from 'backend/model/property/category-identifier.enum';

import { backendApiPropertyStatsDataSingleModelMakeMapper } from '../single-model-make-mapper';

describe('backendApiPropertyStatsDataSingleModelMakeMapper', () => {
  it('should map default data', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(mapper(propertyBackendStub(), 5)).toMatchSnapshot();
  });

  it('should map give getListingStatusDisplayed when areaSpecialistProperty is set', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          areaSpecialistProperty: true,
        },
        5
      ).listingStatusDisplayed
    ).toEqual('Area Specialist Property');
  });

  it('should have empty rentalPeriod, rentalPeriodId, when buy', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          category_identifier: BackendModelPropertyCategoryIdentifierEnum.residentialForSale,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        rentalPeriod: '',
        rentalPeriodId: '',
      })
    );
  });

  it('should have agentUserId = 0, when no agent available', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          agent: undefined,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        agentUserId: 0,
        agent: {
          id: 0,
          name: '',
          isVerified: false,
        },
      })
    );
  });

  it('should have broker.id = 0, when no broker available', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          broker: undefined,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        broker: {
          id: 0,
          name: '',
        },
      })
    );
  });

  it('should give Verified, for verified listing', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          verified: true,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        verified: 'Verified',
      })
    );
  });

  it('should handle empty location tree', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          location_tree: undefined,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        locations: [],
      })
    );
  });

  it('should map smart ad', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          smart_ad: true,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        isSmartAd: 1,
      })
    );
  });

  it('should map cts', () => {
    const mapper = backendApiPropertyStatsDataSingleModelMakeMapper(10);

    expect(
      mapper(
        {
          ...propertyBackendStub(),
          cts: true,
        },
        5
      )
    ).toEqual(
      expect.objectContaining({
        isCtsProperty: 1,
      })
    );
  });
});
