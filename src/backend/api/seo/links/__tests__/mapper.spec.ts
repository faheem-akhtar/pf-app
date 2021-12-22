import { seoBackendStub } from 'stubs/seo/backend.stub';
import { seoLinksStub } from 'stubs/seo/links.stub';

import { BackendModelSeoLinksInterface } from 'backend/model/seo/links.interface';

import { backendApiSeoLinksMapper } from '../mapper';

describe('backendApiSeoLinksMapper()', () => {
  it('should map correctly for both links', () => {
    expect(backendApiSeoLinksMapper(seoBackendStub() as BackendModelSeoLinksInterface)).toEqual(seoLinksStub());
  });

  it('output should be only popular searches', () => {
    expect(
      backendApiSeoLinksMapper(seoBackendStub({ nearby_areas: undefined }) as BackendModelSeoLinksInterface)
    ).toEqual(seoLinksStub({ nearbyAreas: undefined }));
  });

  it('output should be only nearby areas', () => {
    expect(
      backendApiSeoLinksMapper(seoBackendStub({ popular_searches: undefined }) as BackendModelSeoLinksInterface)
    ).toEqual(seoLinksStub({ popularSearches: undefined }));
  });
});
