import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ApiAuthRegisterResponseInterface } from 'api/auth/register/response.interface';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiAuthSignInResponseInterface } from 'api/auth/sign-in/response.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { UserInterface } from 'components/user/interface';
import { AuthLoginService } from 'services/auth/login.service';

describe('AuthLoginService', () => {
  const model: ApiAuthSignInRequestInterface = {
    email: 'test@propertyfinder.ae',
    password: 'password',
    captcha_token: '',
  };

  const error = {
    error: {
      url: '',
      body: '{"errors":[{"detail":"Error message"}]}',
      status: 500,
    },
    status: 500,
    ok: false,
    headers: null,
  };

  beforeEach(() => {
    global.origin = 'test.origin';
  });

  it('should call reject handler and return empty body', async () => {
    mockWindowFetch(error);

    const res = await AuthLoginService(model);

    expect((res as ApiFetcherResultFailureInterface).error.body).toEqual('');
  });

  it('should call reject handler and return server error message', async () => {
    mockWindowFetch({ ok: false, status: 401, text: (): Promise<string> => Promise.resolve(error.error.body) });

    const res = await AuthLoginService(model);

    expect((res as ApiFetcherResultFailureInterface).error.body).toEqual('Error message');
  });

  it('should call resolve handler and return data', async () => {
    const data: ApiAuthSignInResponseInterface = {
      data: {
        id: '1',
        meta: {
          refresh_token: 'refresh token',
          token: 'token ',
        },
        relationships: {
          user: {
            data: {
              id: '1',
              type: 'type',
            },
          },
        },
        type: 'type',
      },
      included: [
        {
          attributes: {
            email: 'test@propertyfinder.ae',
            first_name: 'first name',
            image: 'image',
            last_name: 'last_name',
            phone: 'phone',
          },
          id: 'id',
          type: 'type',
        },
      ],
    };
    mockWindowFetch({
      ok: true,
      status: 200,
      json: (): Promise<ApiAuthRegisterResponseInterface> => Promise.resolve(data),
    });

    const res = await AuthLoginService(model);

    expect((res as ApiFetcherResultSuccessInterface<UserInterface>).data).toEqual({
      email: 'test@propertyfinder.ae',
      first_name: 'first name',
      image: 'image',
      last_name: 'last_name',
      userId: '1',
    });
  });
});
