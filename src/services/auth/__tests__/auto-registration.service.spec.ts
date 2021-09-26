import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiAuthRegisterResponseInterface } from 'api/auth/register/response.interface';
import { AuthAutoRegisterService } from 'services/auth/auto-register.service';
import { AuthService } from 'services/auth/service';
import { AnyValueType } from 'types/any/value.type';

jest.mock('services/auth/service');

describe('AuthAutoRegisterService', () => {
  const model: ApiAuthAutoRegisterRequestInterface = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'test@propertyfinder.ae',
    phone: '971123456789',
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

  it('should call return model on request fail', async () => {
    mockWindowFetch({
      ...error,
    });

    await expect(Object.keys(AuthAutoRegisterService(model)).length).toEqual(0);
  });

  it('should call resolve handler and return user data', async () => {
    const data: ApiAuthRegisterResponseInterface = {
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
      json: (): Promise<AnyValueType> => Promise.resolve(data),
    });

    const res = await AuthAutoRegisterService(model);

    expect(res).toEqual({
      email: 'test@propertyfinder.ae',
      first_name: 'first name',
      image: 'image',
      last_name: 'last_name',
      userId: '1',
    });

    expect(AuthService.onAuthResolved).toHaveBeenCalledTimes(1);
    expect(AuthService.onAuthResolved).toHaveBeenCalledWith(
      {
        meta: {
          refresh_token: 'refresh token',
          token: 'token ',
        },
        user: {
          email: 'test@propertyfinder.ae',
          first_name: 'first name',
          image: 'image',
          last_name: 'last_name',
          userId: '1',
        },
      },
      'register'
    );
  });
});
