import { AnyValueType } from 'types/any/value.type';
import { ApiAuthRegisterResponseInterface } from 'api/auth/register/response.interface';
import { ApiAuthResetPasswordModelInterface } from 'api/auth/reset-password/model.interface';
import { ApiAuthResetPasswordRequestInterface } from 'api/auth/reset-password/request.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { AuthResetPasswordService } from 'services/auth/reset-password.service';
import { mockWindowFetch } from 'mocks/window/fetch.mock';

describe('AuthResetPasswordService', () => {
  const model: ApiAuthResetPasswordRequestInterface = {
    email: 'test@propertyfinder.ae',
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

    await expect(Object.keys(AuthResetPasswordService(model)).length).toEqual(0);
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

    const res = await AuthResetPasswordService(model);

    expect((res as ApiFetcherResultSuccessInterface<ApiAuthResetPasswordModelInterface>).data).toEqual(data);
  });
});
