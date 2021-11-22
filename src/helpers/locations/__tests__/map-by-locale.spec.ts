import { configCommon } from 'config/common';

import { locationsMapByLocale } from '../map-by-locale';

describe('locationsMapByLocale()', () => {
  it('should map correctly and return by current locale', () => {
    const locations = locationsMapByLocale(configCommon.language.current);
    expect(locations['1']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "1",
        "name": "Dubai",
        "path": "Dubai",
        "path_name": "",
      }
    `);
    expect(locations['50']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "50",
        "name": "Dubai Marina",
        "path": "Dubai Marina",
        "path_name": "Dubai",
      }
    `);
    expect(locations['41']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "41",
        "name": "Downtown Dubai",
        "path": "Downtown Dubai",
        "path_name": "Dubai",
      }
    `);
    expect(locations['6']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "6",
        "name": "Abu Dhabi",
        "path": "Abu Dhabi",
        "path_name": "",
      }
    `);
  });

  it('should map correctly and return by alternative locale', () => {
    const alternativeLocations = locationsMapByLocale(configCommon.language.alternative);
    expect(alternativeLocations['1']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "1",
        "name": "دبي",
        "path": "دبي",
        "path_name": "",
      }
    `);
    expect(alternativeLocations['50']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "50",
        "name": "دبي مارينا",
        "path": "دبي مارينا",
        "path_name": "دبي",
      }
    `);
    expect(alternativeLocations['41']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "41",
        "name": "دبي وسط المدينة",
        "path": "دبي وسط المدينة",
        "path_name": "دبي",
      }
    `);
    expect(alternativeLocations['6']).toMatchInlineSnapshot(`
      Object {
        "abbreviation": "",
        "id": "6",
        "name": "أبوظبي",
        "path": "أبوظبي",
        "path_name": "",
      }
    `);
  });
});
