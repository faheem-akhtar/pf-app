import { ApiFactoryInterface } from 'api/factory.interface';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { stringEscape } from 'helpers/string/escape';
import { LocationCompactInterface } from 'types/location/compact.interface';

export class LocationStore {
  private locations: LocationCompactInterface[] = [];
  private fetchAllLocations;
  private fetchLocationsEtag;
  private fetchLocationsForQuery;

  constructor(
    etag: string | null,
    updateEtag: (etag: string) => void,
    private locale: LanguageCodeEnum,
    ApiFactory: ApiFactoryInterface
  ) {
    this.fetchAllLocations = ApiFactory<LocationCompactInterface[]>({
      method: 'GET',
      url: 'location/list',
      handledByPfWebApp: true,
    });

    this.fetchLocationsEtag = ApiFactory<{ etag: string }>({
      method: 'HEAD',
      url: 'location/list',
      handledByPfWebApp: true,
    });

    this.fetchLocationsForQuery = ApiFactory<LocationCompactInterface[]>({
      method: 'GET',
      url: 'location/search',
      handledByPfWebApp: true,
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
        console.error('fetch locations for query failed', result.error);
        return [];
      }

      return result.data;
    });
  }

  public find(predicate: (location: LocationCompactInterface) => boolean): LocationCompactInterface | undefined | null {
    if (!this.locations.length) {
      // eslint-disable-next-line no-console
      console.error('fetch all locations failed');
      return null;
    }

    return this.locations.find(predicate);
  }

  private loadLocations(currentEtag: string | null, updateEtag: (etag: string) => void): void {
    // first make a head request to check the version
    this.fetchLocationsEtag({ locale: this.locale }).then((loadEtagResult) => {
      if (!loadEtagResult.ok) {
        // eslint-disable-next-line no-console
        console.error('fetch locations for etag failed', loadEtagResult.error);
        return;
      }
      // reload the locations if etag changed
      this.fetchAllLocations({
        reloadCache: currentEtag !== loadEtagResult.headers.get('etag'),
        locale: this.locale,
      }).then((result) => {
        if (!result.ok) {
          // eslint-disable-next-line no-console
          console.error('fetch all locations failed', result.error);
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
