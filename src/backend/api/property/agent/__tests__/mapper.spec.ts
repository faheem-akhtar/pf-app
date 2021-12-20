import { propertyAgentStub } from 'stubs/property/agent.stub';
import { propertyBackendStub } from 'stubs/property/backend.stub';

import { backendApiPropertyAgentMapper } from '../mapper';

describe('backendApiPropertyAgentMapper()', () => {
  it('should map correctly', () => {
    expect(
      backendApiPropertyAgentMapper([
        propertyBackendStub({
          agent: {
            ...propertyAgentStub({
              links: {
                profile: '',
                image_desktop:
                  'https://www.propertyfinder.bh/images/pf_agent/picture/da367a068fc789a45d4155084daa42105938d276/desktop',
              },
              languages: [{ name: 'English' }, { name: 'Hindi' }],
            }),
          },
        }),
      ])
    ).toMatchInlineSnapshot(`
      Object {
        "brokerAgentCount": 0,
        "brokerId": "2867",
        "brokerLocationName": "Abu Dhabi",
        "brokerName": "Moon Star Real Estate",
        "brokerPropertiesCount": 189,
        "id": "156740",
        "imageSrc": "https://www.propertyfinder.bh/images/pf_agent/picture/da367a068fc789a45d4155084daa42105938d276/desktop",
        "languages": Array [
          "English",
          "Hindi",
        ],
        "mobileNumber": "",
        "name": "Mr Hamid",
        "position": "Agent",
        "userId": "28140",
      }
    `);
  });

  it('fallback values should be taken when there is no data', () => {
    expect(backendApiPropertyAgentMapper([propertyBackendStub()])).toMatchInlineSnapshot(`
      Object {
        "brokerAgentCount": 0,
        "brokerId": "2867",
        "brokerLocationName": "Abu Dhabi",
        "brokerName": "Moon Star Real Estate",
        "brokerPropertiesCount": 189,
        "id": "156740",
        "imageSrc": null,
        "languages": Array [],
        "mobileNumber": "",
        "name": "Mr Hamid",
        "position": "Agent",
        "userId": "28140",
      }
    `);
  });
});
