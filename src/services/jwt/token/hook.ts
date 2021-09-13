import { useEffect, useState } from 'react';

import { AuthService } from 'services/auth/service';
import { JwtTokenService } from './service';

export const useJwtToken = (): string | null => {
  const [token, setToken] = useState(JwtTokenService.getToken());
  useEffect(() => {
    return AuthService.subscribe((userData) => {
      if (userData) {
        setToken(JwtTokenService.getToken());
      } else {
        setToken(null);
      }
    });
  }, []);

  return token;
};
