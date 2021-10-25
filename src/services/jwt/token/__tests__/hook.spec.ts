import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';

import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { useJwtToken } from 'services/jwt/token/hook';
import { JwtTokenService } from 'services/jwt/token/service';
import { UserModelInterface } from 'services/user/model.interface';

describe('useGalleryScrollEffects', () => {
  const setState = jest.fn();
  beforeEach(() => {
    mockReactUseState(setState);
    mockReactUseEffect();
  });

  it('should reset token', () => {
    jest.spyOn(JwtTokenService, 'getToken').mockReturnValue('token');
    useJwtToken();
    AuthService['updateUserData'](null, AuthSubscribeEventTypeEnum.logout, null);
    expect(setState).toHaveBeenCalledWith(null);
  });

  it('should update token', () => {
    jest.spyOn(JwtTokenService, 'getToken').mockReturnValue('new token');
    useJwtToken();
    AuthService['updateUserData']({} as UserModelInterface, AuthSubscribeEventTypeEnum.login, 'Google');
    expect(setState).toHaveBeenCalledWith('new token');
  });

  it('should subscribe to auth service updates', () => {
    AuthService['subscribe'] = jest.fn();
    useJwtToken();
    expect(AuthService['subscribe']).toHaveBeenCalled();
  });

  it('should not add listeners when mouse or touch are not down', () => {
    jest.spyOn(JwtTokenService, 'getToken').mockReturnValue('token');

    expect(useJwtToken()).toEqual('token');
  });
});
