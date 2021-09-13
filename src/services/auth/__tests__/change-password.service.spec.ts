import { AuthChangePasswordService } from 'services/auth/change-password.service';
import { mockWindowFetch } from 'mocks/window/fetch.mock';

describe('AuthChangePasswordService', () => {
  beforeEach(() => {
    global.origin = 'test.origin';
  });

  it('should clean user data', () => {
    const fetchMock = mockWindowFetch({
      ok: true,
      status: 200,
    });

    AuthChangePasswordService({
      repeat_password: 'repeat_password',
      reset_token: 'reset_token',
      password: 'password',
    });

    expect(fetchMock).toBeCalled();
  });
});
