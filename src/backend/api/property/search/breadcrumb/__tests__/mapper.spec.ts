import { propertyListBreadcrumbBackendStub } from 'stubs/property/list/breadcrumb/backend.stub';
import { propertyListBreadcrumbStub } from 'stubs/property/list/breadcrumb/stub';

import { BackendApiPropertySearchBreadcrumbInterface } from '../interface';
import { backendApiPropertySearchBreadcrumbMapper } from '../mapper';

describe('backendApiPropertySearchBreadcrumbMapper()', () => {
  it('should map data correctly', () => {
    expect(
      backendApiPropertySearchBreadcrumbMapper(
        propertyListBreadcrumbBackendStub() as BackendApiPropertySearchBreadcrumbInterface[]
      )
    ).toEqual(propertyListBreadcrumbStub());
  });
});
