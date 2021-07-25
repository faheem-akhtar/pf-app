import { stringEscape } from 'helpers/string/escape';

import { ApiFactoryInterface } from 'api/factory.interface';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from './compact.interface';

export class LocationStore {
  private locations: LocationCompactInterface[] = [];
  private fetchAllLocations;
  private fetchLocationsEtag;
  private fetchLocationsForQuery;

  constructor(
    etag: string | null,
    updateEtag: (etag: string) => void,
    private locale: LanguageCodeEnum,
    apiFactory: ApiFactoryInterface
  ) {
    this.fetchAllLocations = apiFactory<LocationCompactInterface[]>({
      method: 'GET',
      url: 'location/list',
    });

    this.fetchLocationsEtag = apiFactory<{ etag: string }>({
      method: 'HEAD',
      url: 'location/list',
    });

    this.fetchLocationsForQuery = apiFactory<LocationCompactInterface[]>({
      method: 'GET',
      url: 'location/search',
      queryDefaultParams: {
        'fields[location]': 'name,path,path_name',
      },
    });

    if (etag) {
      // Since we have etag, the locations are already cached in browser, hence do not delay the reading
      this.loadLocations(etag, updateEtag);
    } else {
      // TODO-FE[] discuss this further
      // Start loading locations with a delay, to aviod impacting device
      setTimeout(() => this.loadLocations(etag, updateEtag), 500);
    }
  }

  public search(searchString: string, limit: number): Promise<LocationCompactInterface[]> {
    if (this.locations.length) {
      const result = [];

      // locations are loaded, search and return result;
      // Clear all brackets and trim the string
      const name = stringEscape(searchString.replace(/\(|\)/g, '')).trim();

      // Allow to find name which start from latter or brackets like: "Tecom" or "(Tecom", result will be the same
      const regexp = new RegExp(`\\s\\(*${name}[^\\s]*|^\\(*${name}[^\\s]*`, 'gi');

      if (!name) {
        return Promise.resolve([]);
      }

      for (const location of this.locations) {
        const searchString = [location.abbreviation || '', location.name].join(' ').trim();

        if (searchString.match(regexp)) {
          result.push(location);
        }

        if (result.length === limit) {
          break;
        }
      }

      return Promise.resolve(result);
    }

    return this.fetchLocationsForQuery({
      locale: this.locale,
      query: {
        'filter[full_name]': searchString,
        'page[limit]': limit,
      },
    }).then((result) => {
      if (!result.ok) {
        // eslint-disable-next-line no-console
        console.error(result.error);
        return [];
      }

      return result.data;
    });
  }

  private loadLocations(currentEtag: string | null, updateEtag: (etag: string) => void): void {
    // first make a head request to check the version
    this.fetchLocationsEtag({ locale: this.locale }).then((loadEtagResult) => {
      if (!loadEtagResult.ok) {
        // eslint-disable-next-line no-console
        console.error(loadEtagResult.error);
        return;
      }
      // reload the locations if etag changed
      this.fetchAllLocations({
        reloadCache: currentEtag !== loadEtagResult.headers.get('etag'),
        locale: this.locale,
      }).then((result) => {
        if (!result.ok) {
          // eslint-disable-next-line no-console
          console.error(result.error);
          return;
        }
        this.locations = result.data;
        const etagFromResponse = result.headers.get('etag');

        if (etagFromResponse) {
          updateEtag(etagFromResponse);
        }
      });
    });
  }
}
