import React from 'react';

export const PropertySearchStatsDataPromiseForCurrentQueryContext = React.createContext<Promise<{ ok: boolean }>>(
  Promise.resolve({ ok: false })
);
