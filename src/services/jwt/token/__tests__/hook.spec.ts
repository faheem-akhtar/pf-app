/**
 * @jest-environment jsdom
 */
import { AuthService } from 'services/auth/service';
import { JwtTokenService } from 'services/jwt/token/service';
import { mockReactUseEffect } from 'mocks/react/mock-use-effect';
import { mockReactUseState } from 'mocks/react/mock-use-state';
import { useJwtToken } from 'services/jwt/token/hook';
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
    AuthService.updateUserData(null);
    expect(setState).toHaveBeenCalledWith(null);
  });

  it('should update token', () => {
    jest.spyOn(JwtTokenService, 'getToken').mockReturnValue('new token');
    useJwtToken();
    AuthService.updateUserData({} as UserModelInterface);
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