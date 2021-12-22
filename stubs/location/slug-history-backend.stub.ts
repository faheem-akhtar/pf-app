import { BackendModelLocationSlugHistoryInterface } from 'backend/model/location/slug-history.interface';

export const locationSlugHistoryBackendStub = (
  data: Partial<BackendModelLocationSlugHistoryInterface> = {}
): BackendModelLocationSlugHistoryInterface =>
  ({
    id: '111',
    original_slug: 'old-location-slug',
    new_slug: 'new-slug',
    ...data,
  } as BackendModelLocationSlugHistoryInterface);
