import { propertyListBreadcrumbBackendStub } from 'stubs/property/list/breadcrumb/backend.stub';
import { propertyListBreadcrumbStub } from 'stubs/property/list/breadcrumb/stub';

import { backendApiPropertySearchBreadcrumbMapper } from '../mapper';
import { BackendApiPropertySearchBreadcrumbResultType } from '../result.type';

describe('backendApiPropertySearchBreadcrumbMapper()', () => {
  it('should map data correctly', () => {
    expect(
      backendApiPropertySearchBreadcrumbMapper(
        propertyListBreadcrumbBackendStub() as BackendApiPropertySearchBreadcrumbResultType[]
      )
    ).toEqual(propertyListBreadcrumbStub());
  });
});
