import { propertyBackendStub } from 'stubs/property/backend.stub';

import { backendApiPropertyBrokerMapper } from '../mapper';

describe('backendApiPropertyBrokerMapper()', () => {
  it('should map correctly', () => {
    expect(backendApiPropertyBrokerMapper([propertyBackendStub()])).toMatchInlineSnapshot(`
      Object {
        "agentCount": 0,
        "id": "2867",
        "imageSrc": "https://www.propertyfinder.ae/broker/1/178/98/MODE/85bdb1/2867-logo.jpg?ctr=ae",
        "locationName": "Abu Dhabi",
        "name": "Moon Star Real Estate",
        "propertiesCount": 189,
      }
    `);
  });

  it('fallback values should be taken when there is no data', () => {
    expect(backendApiPropertyBrokerMapper([propertyBackendStub({ broker: undefined })])).toMatchInlineSnapshot(`
      Object {
        "agentCount": 0,
        "id": "",
        "imageSrc": null,
        "locationName": "",
        "name": "",
        "propertiesCount": 0,
      }
    `);
  });
});
