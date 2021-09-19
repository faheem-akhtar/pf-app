import useSWR from 'swr';

import { WindowService } from 'services/window/service';

export const useOnBoardingStorage = (key: string): { hasBeenClosedMap: Record<string, boolean>; mutate: Function } => {
  const { data, mutate } = useSWR('api_user', () => WindowService.localStorage.getItem(key));

  return {
    hasBeenClosedMap: (data as Record<string, boolean>) || {},
    mutate,
  };
};
