import { useEffect, useState } from 'react';

import { Router } from 'next/router';

export const usePageIsLoading = (): boolean => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onRouteChangeStart = (): void => setLoading(true);
    const onRouteChangeComplete = (): void => setLoading(false);

    Router.events.on('routeChangeStart', onRouteChangeStart);
    Router.events.on('routeChangeComplete', onRouteChangeComplete);

    return (): void => {
      Router.events.off('routeChangeStart', onRouteChangeStart);
      Router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return loading;
};
