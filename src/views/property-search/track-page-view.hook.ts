import { useRef } from 'react';

import { PropertySearchViewPropsType } from './view-props.type';

export const usePropertySearchTrackPageView = (
  prevProps: PropertySearchViewPropsType | void,
  props: PropertySearchViewPropsType
): {
  /**
   * Promise to load required stats data. only after this data is loaded listing impressions and leads can be fired
   */
  statsDataPromise: Promise<{ ok: boolean }>;
} => {
  const statsDataPromiseRef = useRef(Promise.resolve({ ok: false }));

  return { statsDataPromise: statsDataPromiseRef.current };
};
