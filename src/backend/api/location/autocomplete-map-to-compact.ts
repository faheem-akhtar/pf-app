import { BackendModelLocationAutocompleteInterface } from 'backend/model/location/autocomplete.interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

export const backendApiLocationAutocompleteMapToCompact = (
  location: BackendModelLocationAutocompleteInterface
): LocationCompactInterface => ({
  name: location.name,
  abbreviation: location.abbreviation,
  id: location.id,
  path: location.name,
  path_name: location.path_name,
  slug: location.current_language_slug,
});
