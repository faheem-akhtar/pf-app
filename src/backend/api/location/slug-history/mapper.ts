import { BackendModelLocationSlugHistoryInterface } from 'backend/model/location/slug-history.interface';
import { LocationSlugHistoryInterface } from 'types/location/slug-history.interface';

export const backendApiLocationSlugHistoryMapper = (
  data: BackendModelLocationSlugHistoryInterface[]
): LocationSlugHistoryInterface[] =>
  data.map(({ id, original_slug, new_slug }) => ({
    id,
    originalSlug: original_slug,
    newSlug: new_slug,
  }));
