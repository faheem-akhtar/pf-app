import { filtersFormStub } from 'stubs/filters/form.stub';

import { BackendJsonApiPayloadInterface } from 'backend/json-api/payload.interface';
import { backendJsonApiSync } from 'backend/json-api/sync';

import { backendApiFormSettingsMapper } from '../mapper';
import { BackendApiFormSettingsJsonApiResultType } from './../json-api-result.type';

describe('backendApiFormSettingsMapper()', () => {
  it('should map correctly', () => {
    const jsonApiData = backendJsonApiSync(filtersFormStub as unknown as BackendJsonApiPayloadInterface);
    expect(backendApiFormSettingsMapper(jsonApiData as BackendApiFormSettingsJsonApiResultType)).toMatchSnapshot();
  });
});
